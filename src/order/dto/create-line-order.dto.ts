import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive, IsNotEmpty } from 'class-validator';

export class CreateLineOrderDto {
  @ApiProperty({
    description: 'The quantity of the product in the line order',
    example: 2,
  })
  @IsInt()
  @IsPositive()
  quantity: number;

  @ApiProperty({
    description: 'The price of the product in the line order',
    example: 50.0,
  })
  @IsPositive()
  price: number;

  @ApiProperty({
    description: 'The product ID associated with the line order',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  productId: number;
}
