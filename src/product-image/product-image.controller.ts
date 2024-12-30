import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PrivateRouteAdmin } from 'src/shared/decorators/private-route.decorator';
import { CreateProductImageDto } from './dto/create-product-image.dto';
import { ProductImageService } from './product-image.service';

@ApiTags('Product Images')
@Controller('product-images')
@PrivateRouteAdmin()
export class ProductImageController {
  constructor(private readonly productImageService: ProductImageService) {}

  @Post()
  @ApiOperation({ summary: 'Add a new image to a product' })
  @ApiResponse({ status: 201, description: 'Product image added successfully' })
  async addImage(@Body() createImageDto: CreateProductImageDto) {
    return this.productImageService.addImage(createImageDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product image' })
  @ApiResponse({
    status: 200,
    description: 'Product image deleted successfully',
  })
  async deleteImage(@Param('id') id: string) {
    return this.productImageService.deleteImage(+id);
  }
}
