import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  PrivateRouteAnyRole,
  PrivateRouteCustomer,
  PrivateRouteAdmin,
} from 'src/shared/decorators/private-route.decorator';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderQueryDto } from './dto/order-query.dto';
import { OrderService } from './order.service';

@ApiTags('Orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({ status: 201, description: 'Order successfully created.' })
  @PrivateRouteCustomer()
  async create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get orders with filters, sorting, and pagination' })
  @ApiResponse({
    status: 200,
    description: 'List of orders with applied filters.',
  })
  @PrivateRouteAdmin()
  async findAll(@Query() query: OrderQueryDto) {
    return this.orderService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an order by ID' })
  @ApiResponse({ status: 200, description: 'Order details.' })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  @PrivateRouteAnyRole()
  async findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }
}
