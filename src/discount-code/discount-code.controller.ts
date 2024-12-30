import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { DiscountCodeService } from './discount-code.service';
import { CreateDiscountCodeDto } from './dto/create-discount-code.dto';
import { UpdateDiscountCodeDto } from './dto/update-discount-code.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DiscountCodeQueryDto } from './dto/discount-code-query.dto';
import { PrivateRouteAdmin } from 'src/shared/decorators/private-route.decorator';

@ApiTags('Discount Codes')
@Controller('discount-codes')
export class DiscountCodeController {
  constructor(private readonly discountCodeService: DiscountCodeService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new discount code' })
  @ApiResponse({
    status: 201,
    description: 'Discount code successfully created.',
  })
  @PrivateRouteAdmin()
  async create(@Body() createDiscountCodeDto: CreateDiscountCodeDto) {
    return this.discountCodeService.create(createDiscountCodeDto);
  }

  @Get()
  @ApiOperation({
    summary:
      'Get all discount codes with pagination, search, filters, and sorting',
  })
  @ApiResponse({
    status: 200,
    description: 'List of discount codes with applied filters.',
  })
  @PrivateRouteAdmin()
  async findAll(@Query() query: DiscountCodeQueryDto) {
    return this.discountCodeService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a discount code by ID' })
  @ApiResponse({ status: 200, description: 'Discount code details.' })
  @ApiResponse({ status: 404, description: 'Discount code not found.' })
  @PrivateRouteAdmin()
  async findOne(@Param('id') id: string) {
    return this.discountCodeService.findOne(+id);
  }

  @Get('code/:code')
  @ApiOperation({ summary: 'Get a discount code by code' })
  @ApiResponse({ status: 200, description: 'Discount code details.' })
  @ApiResponse({ status: 404, description: 'Discount code not found.' })
  async findOneByCode(@Param('code') code: string) {
    return this.discountCodeService.findOneByCode(code);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a discount code' })
  @ApiResponse({
    status: 200,
    description: 'Discount code successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Discount code not found.' })
  @PrivateRouteAdmin()
  async update(
    @Param('id') id: string,
    @Body() updateDiscountCodeDto: UpdateDiscountCodeDto,
  ) {
    return this.discountCodeService.update(+id, updateDiscountCodeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a discount code' })
  @ApiResponse({
    status: 200,
    description: 'Discount code successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Discount code not found.' })
  @PrivateRouteAdmin()
  async remove(@Param('id') id: string) {
    return this.discountCodeService.remove(+id);
  }
}
