import { Injectable, BadRequestException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
// import 'multer';

@Injectable()
export class UploadService {
  async uploadFile(
    file: Express.Multer.File,
  ): Promise<{ filename: string; path: string }> {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const allowedTypes = ['image/png', 'image/jpeg'];
    if (!allowedTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        'Only png and jpeg image types are allowed',
      );
    }

    // The file was saved by Multer middleware at this point
    return {
      filename: `${process.env.APP_URL}/${file.filename}`,
      path: `${process.env.APP_URL}/images/${file.filename}`, // Relative path to the saved file
    };
  }

  async deleteFile(filename: string): Promise<string> {
    const filePath = path.join(__dirname, '..', '..', 'images', filename);

    if (!fs.existsSync(filePath)) {
      throw new BadRequestException('File not found');
    }

    fs.unlinkSync(filePath);
    return `File ${filename} deleted successfully.`;
  }
}
