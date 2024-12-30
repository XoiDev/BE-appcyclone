import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt, IsUrl } from 'class-validator';

export class CreateProductImageDto {
  @ApiProperty({ description: 'Product ID', example: 1 })
  @IsInt()
  productId: number;

  @ApiProperty({
    description: 'Image URL',
    example: ['https://example.com/image1.jpg'],
  })
  @IsArray()
  // @IsUrl({}, { each: true })
  urls: string[];
}
