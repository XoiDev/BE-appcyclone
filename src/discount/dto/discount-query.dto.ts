import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsDate, IsBoolean } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import {
  QueryParamPageDto,
  QueryParamLimitDto,
} from 'src/shared/decorators/query-dto.decorator';

export class DiscountQueryDto {
  @QueryParamPageDto()
  page?: number;

  @QueryParamLimitDto()
  limit?: number;

  @ApiPropertyOptional({
    description: 'Search by discount name',
    example: 'Holiday Sale',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    description: 'Start date filter (YYYY-MM-DD)',
    example: '2024-12-01',
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  startDate?: Date;

  @ApiPropertyOptional({
    description: 'End date filter (YYYY-MM-DD)',
    example: '2024-12-31',
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  endDate?: Date;

  @ApiPropertyOptional({
    description: 'Filter by active status',
    example: true,
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  @IsBoolean()
  active?: boolean;
}
