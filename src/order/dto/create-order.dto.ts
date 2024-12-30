import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({
    description: 'The customer ID associated with the order',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  customerId: number;

  @ApiProperty({
    description: 'Unique discount code',
    example: 'SUMMER2024',
    required: false,
  })
  @IsString()
  @IsOptional()
  discountCode?: string;
}
