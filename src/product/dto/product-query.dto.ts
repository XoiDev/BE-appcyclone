import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import {
  QueryParamLimitDto,
  QueryParamPageDto,
  QueryParamSortByDto,
  QueryParamSortOrderDto,
} from 'src/shared/decorators/query-dto.decorator';

enum ProductSortByQueryDto {
  Price = 'price',
  CreatedAt = 'createdAt',
}

export class ProductQueryDto {
  @QueryParamPageDto()
  page?: number;

  @QueryParamLimitDto()
  limit?: number;

  @QueryParamSortByDto(ProductSortByQueryDto)
  sortBy?: ProductSortByQueryDto;

  @QueryParamSortOrderDto()
  sortOrder?: string;

  @ApiPropertyOptional({
    description: 'Search products by name (case insensitive)',
    example: 'Laptop',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: 'Filter by vendor ID', example: 1 })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  vendorId?: number;

  @ApiPropertyOptional({ description: 'Filter by category ID', example: 2 })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  categoryId?: number;
}
