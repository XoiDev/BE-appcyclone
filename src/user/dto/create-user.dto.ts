import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'User email', example: 'user@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Full name of the user', example: 'John Doe' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Username', example: 'johndoe' })
  @IsString()
  username: string;

  @ApiProperty({ description: 'Password', example: 'password123' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    description: 'Avatar URL',
    example: 'http://example.com/avatar.jpg',
    required: false,
  })
  @IsOptional()
  @IsString()
  avatar?: string;
}
