import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsInt, Min, Max } from 'class-validator';
import {
  QueryParamLimitDto,
  QueryParamPageDto,
} from 'src/shared/decorators/query-dto.decorator';

export class ReviewQueryDto {
  @QueryParamPageDto()
  page?: number;

  @QueryParamLimitDto()
  limit?: number;

  @Type(() => Number)
  @ApiPropertyOptional({
    description: 'Filter reviews by rating (1-5)',
    example: 5,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  rating?: number;
}
