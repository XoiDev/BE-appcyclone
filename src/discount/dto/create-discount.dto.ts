import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsInt,
  IsPositive,
  Min,
  Max,
  IsNotEmpty,
  IsString,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { IsEndDateAfterStartDate } from 'src/shared/validator/is-end-date-after-start-date.validator';

export class CreateDiscountDto {
  @ApiProperty({
    description: 'The name of the discount',
    example: 'Sale off 20% in Summer',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The description of the discount',
    example: 'A high-end gaming laptop',
    required: false,
  })
  @IsString()
  @IsOptional()
  desc?: string;

  @ApiProperty({
    description: 'Discount percentage (e.g., 20 for 20%)',
    example: 20,
  })
  @IsPositive()
  @Min(1)
  @Max(100)
  percentage: number;

  @ApiProperty({
    description: 'Start date of the discount',
    example: '2024-12-19T00:00:00.000Z',
  })
  @IsDate()
  @Type(() => Date) // Transform string to Date
  startDate: Date;

  @ApiProperty({
    description: 'End date of the discount',
    example: '2024-12-20T23:59:59.000Z',
  })
  @IsDate()
  @Type(() => Date)
  @IsEndDateAfterStartDate('startDate', {
    message: 'End date must be after start date',
  })
  endDate: Date;

  @ApiProperty({
    description: 'Product IDs for the discount',
    example: [1, 2, 3],
  })
  @IsInt({ each: true })
  productIds: number[];
}
