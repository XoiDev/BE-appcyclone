import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty({
    description: 'The unique email of the customer',
    example: 'customer@example.com',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'The name of the customer', example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The unique username of the customer',
    example: 'johndoe',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'The password of the customer',
    example: 'securePassword123',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'The avatar URL of the customer',
    example: 'http://example.com/avatar.jpg',
    required: false,
  })
  @IsString()
  @IsOptional()
  avatar?: string;
}
