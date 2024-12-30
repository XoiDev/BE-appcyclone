import { Controller, Post, Body, Get, Query, Param } from '@nestjs/common';
import { DiscountService } from './discount.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { PrivateRouteAdmin } from 'src/shared/decorators/private-route.decorator';
import { DiscountQueryDto } from './dto/discount-query.dto';

@ApiTags('Discounts')
@Controller('discounts')
@PrivateRouteAdmin()
export class DiscountController {
  constructor(private readonly discountService: DiscountService) {}

  @Post()
  @ApiOperation({ summary: 'Create a discount for multiple products' })
  async createDiscountForProducts(
    @Body()
    createDiscountDto: CreateDiscountDto,
  ) {
    return this.discountService.createDiscountForProducts(createDiscountDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all discounts with pagination and filters' })
  @ApiResponse({ status: 200, description: 'List of discounts' })
  async getAllDiscounts(@Query() query: DiscountQueryDto) {
    return this.discountService.getAllDiscounts(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a discount by ID' })
  @ApiResponse({ status: 200, description: 'Discount details.' })
  @ApiResponse({ status: 404, description: 'Discount not found.' })
  async findOne(@Param('id') id: string) {
    return this.discountService.findOne(+id);
  }

  // @Get('apply')
  // @ApiOperation({ summary: 'Manually apply active discounts' })
  // async applyDiscounts() {
  //   await this.discountService.applyDiscounts();
  //   return { message: 'Discounts applied successfully' };
  // }

  // @Get('revert')
  // @ApiOperation({ summary: 'Manually revert expired discounts' })
  // async revertExpiredDiscounts() {
  //   await this.discountService.revertExpiredDiscounts();
  //   return { message: 'Expired discounts reverted successfully' };
  // }
}
