import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsBoolean } from 'class-validator';
import {
  QueryParamPageDto,
  QueryParamLimitDto,
  QueryParamSortByDto,
  QueryParamSortOrderDto,
} from 'src/shared/decorators/query-dto.decorator';

export enum DiscountCodeSortBy {
  CREATED_AT = 'createdAt',
  MIN_AMOUNT = 'minAmount',
}

export class DiscountCodeQueryDto {
  @QueryParamPageDto()
  page?: number;

  @QueryParamLimitDto()
  limit?: number;

  @QueryParamSortByDto(DiscountCodeSortBy)
  sortBy?: DiscountCodeSortBy;

  @QueryParamSortOrderDto()
  sortOrder?: string;

  @ApiPropertyOptional({
    description: 'Search discount codes by code',
    example: 'SUMMER2024',
  })
  @IsOptional()
  @IsString()
  code?: string;

  @ApiPropertyOptional({
    description: 'Filter by active status',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
