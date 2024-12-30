import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateProductImageDto {
  @ApiPropertyOptional({
    description: 'Updated image URL',
    example: 'https://example.com/image-updated.jpg',
  })
  @IsOptional()
  @IsString()
  @IsUrl()
  url?: string;
}
