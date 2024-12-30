import { applyDecorators } from '@nestjs/common';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString, IsNumber, Min, IsEnum } from 'class-validator';

export const QueryParamPageDto = () => {
  return applyDecorators(
    Type(() => Number),
    ApiPropertyOptional({
      description: 'Page number for pagination',
      example: 1,
    }),
    IsOptional(),
    IsNumber(),
    Min(1),
  );
};

export const QueryParamLimitDto = () => {
  return applyDecorators(
    Type(() => Number),
    ApiPropertyOptional({
      description: 'Number of items per page',
      example: 10,
    }),
    IsOptional(),
    IsNumber(),
    Min(1),
  );
};

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc',
}

export const QueryParamSortOrderDto = () => {
  return applyDecorators(
    ApiPropertyOptional({
      description: 'Sort order (asc or desc)',
      example: 'desc',
      enum: SortOrder,
    }),
    IsOptional(),
    IsString(),
    IsEnum(SortOrder),
  );
};

/**
 * A generic custom decorator for query sort fields.
 * @param type The enum type to validate against.
 */
export const QueryParamSortByDto = <T extends Record<string, any>>(type: T) => {
  const sortKeys = Object.values(type);
  return applyDecorators(
    ApiPropertyOptional({
      description: `Field to sort by (${sortKeys.join(', ')})`,
      example: sortKeys[0],
      enum: type,
    }),
    IsOptional(),
    IsString(),
    IsEnum(type),
  );
};
