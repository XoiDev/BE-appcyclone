import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  Delete,
  Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UploadService } from './upload.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { PrivateRouteAnyRole } from 'src/shared/decorators/private-route.decorator';

@ApiTags('Upload')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @ApiOperation({ summary: 'Upload an image file to the server' })
  @ApiResponse({ status: 201, description: 'Image uploaded successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid file format or size.' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Image file to upload',
    required: true,
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './images', // Save to images folder
        filename: (req, file, cb) => {
          // Rename file to avoid collisions
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname); // Get file extension
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        // Accept only png and jpeg
        if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
          cb(null, true);
        } else {
          cb(
            new BadRequestException(
              'Only png and jpeg image types are allowed',
            ),
            false,
          );
        }
      },
      limits: {
        fileSize: 4 * 1024 * 1024, // 4 MB
      },
    }),
  )
  @PrivateRouteAnyRole()
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const { path } = await this.uploadService.uploadFile(file);
    return { url: path };
  }

  @Delete(':filename')
  @ApiOperation({ summary: 'Delete an uploaded image file' })
  @ApiResponse({ status: 200, description: 'File deleted successfully.' })
  @ApiResponse({ status: 400, description: 'File not found.' })
  @PrivateRouteAnyRole()
  async deleteFile(@Param('filename') filename: string) {
    return this.uploadService.deleteFile(filename);
  }
}
