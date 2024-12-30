import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsNumber,
  IsPositive,
  IsNotEmpty,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ description: 'The name of the product', example: 'Laptop' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The description of the product',
    example: 'A high-end gaming laptop',
    required: false,
  })
  @IsString()
  @IsOptional()
  desc?: string;

  @ApiProperty({ description: 'The price of the product', example: 1299.99 })
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({
    description: 'The thumbnail URL of the product',
    example: 'http://example.com/thumbnail.jpg',
    required: false,
  })
  @IsString()
  @IsOptional()
  thumbnail?: string;

  @ApiProperty({ description: 'The vendor of the product', example: 1 })
  @IsNumber()
  @IsPositive()
  vendorId: number;

  @ApiProperty({ description: 'The category of the product', example: 1 })
  @IsNumber()
  @IsPositive()
  categoryId: number;
}
