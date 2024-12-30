import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ description: 'User email', example: 'user@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Username', example: 'johndoe' })
  @IsString()
  username: string;

  @ApiProperty({ description: 'Password', example: 'password123' })
  @IsString()
  @MinLength(6)
  password: string;
}

export class LoginDto {
  @ApiProperty({ description: 'Username', example: 'ManuelHilll_Dach2' })
  @IsString()
  username: string;

  @ApiProperty({ description: 'Password', example: 'password123' })
  @IsString()
  password: string;
}
