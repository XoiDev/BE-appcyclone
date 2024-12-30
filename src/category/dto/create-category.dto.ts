import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'The name of the category',
    example: 'Electronics',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The thumbnail URL of the category',
    example: 'http://example.com/thumbnail.jpg',
    required: false,
  })
  @IsString()
  @IsOptional()
  thumbnail?: string;
}
