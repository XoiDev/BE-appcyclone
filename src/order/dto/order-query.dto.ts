import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import {
  QueryParamSortOrderDto,
  QueryParamPageDto,
  QueryParamLimitDto,
  QueryParamSortByDto,
} from 'src/shared/decorators/query-dto.decorator';

export enum SortOrderByQuery {
  TotalPrice = 'totalPrice',
  CreatedAt = 'createdAt',
  Quantity = 'quantity',
}

export class OrderQueryDto {
  @QueryParamPageDto()
  page?: number;

  @QueryParamLimitDto()
  limit?: number;

  @QueryParamSortByDto(SortOrderByQuery)
  sortBy?: SortOrderByQuery;

  @QueryParamSortOrderDto()
  sortOrder?: string;

  @ApiPropertyOptional({
    description: 'Filter by exact customer name',
    example: '',
  })
  @IsOptional()
  @IsString()
  customerName?: string;
}
