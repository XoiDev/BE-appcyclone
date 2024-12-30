import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc',
}

export class SortOrderDto {
  @ApiPropertyOptional({
    description: 'Sort order (asc or desc)',
    example: 'desc',
    enum: SortOrder,
  })
  @IsOptional()
  @IsString()
  @IsEnum(SortOrder)
  sortOrder?: SortOrder;
}
