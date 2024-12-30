import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateCartDto {
  @ApiProperty({ description: 'Customer ID', example: 1 })
  @IsInt()
  @IsNotEmpty()
  customerId: number;

  @ApiProperty({ description: 'Product ID', example: 2 })
  @IsInt()
  @IsNotEmpty()
  productId: number;

  @ApiProperty({
    description: 'Quantity of the product in the cart',
    example: 3,
  })
  @IsInt()
  @IsPositive()
  quantity: number;

  // @ApiProperty({ description: 'Total price of the cart', example: 150.75 })
  // @IsPositive()
  // price: number;
}
