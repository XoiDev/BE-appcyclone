import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Min, Max } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({ description: 'Rating for the product (1 to 5)', example: 5 })
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiProperty({
    description: 'Optional review comment',
    example: 'Great product!',
  })
  @IsOptional()
  @IsString()
  comment?: string;

  @ApiProperty({ description: 'Product ID being reviewed', example: 1 })
  @IsInt()
  productId: number;
}
