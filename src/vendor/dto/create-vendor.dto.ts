import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsUrl } from 'class-validator';

export class CreateVendorDto {
  @ApiProperty({ description: 'The name of the vendor', example: 'Tech Store' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The thumbnail URL of the vendor',
    example: 'http://example.com/thumbnail.jpg',
    required: false,
  })
  @IsUrl()
  @IsOptional()
  thumbnail?: string;
}
