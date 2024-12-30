import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsNumber,
  IsArray,
  Min,
  Max,
  IsBoolean,
} from 'class-validator';

export class CreateDiscountCodeDto {
  @ApiPropertyOptional({
    description: 'Description of the discount',
    example: 'Summer sale 20% off',
    uniqueItems: true,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Minimum amount required to apply the discount',
    example: 100,
  })
  @IsNumber()
  @Min(1)
  minAmount: number;

  @ApiProperty({
    description: 'Discount rate as a percentage (e.g., 0.2 for 20%)',
    example: 0.2,
  })
  @IsNumber()
  @Min(0)
  @Max(100)
  discountRate: number;

  @ApiProperty({
    description: 'List of product IDs this discount code applies to',
    example: [1, 2, 3],
  })
  @IsArray()
  @IsNumber({}, { each: true })
  productIds: number[];

  @ApiProperty({
    description: 'Number of code can apply',
    example: 10,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  numberCodeApply?: number;
}
