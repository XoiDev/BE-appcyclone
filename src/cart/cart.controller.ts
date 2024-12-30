import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { PrivateRouteCustomer } from 'src/shared/decorators/private-route.decorator';
import { GetUserFromReq } from 'src/shared/decorators/get-user-from-req';

@ApiTags('Carts')
@Controller('carts')
@PrivateRouteCustomer()
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('/add')
  @ApiOperation({ summary: 'Add item to cart' })
  @ApiResponse({ status: 201, description: 'Cart successfully created.' })
  async create(@Body() createCartDto: CreateCartDto) {
    return this.cartService.create(createCartDto);
  }

  @Get('')
  @ApiOperation({ summary: 'Get a cart by customerId' })
  @ApiResponse({ status: 200, description: 'Cart details.' })
  @ApiResponse({ status: 404, description: 'Cart not found.' })
  async findOne(@GetUserFromReq('id') id: string) {
    return this.cartService.findByCustomerId(+id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a item of cart by id' })
  @ApiResponse({ status: 200, description: 'Cart successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Cart not found.' })
  async remove(@Param('id') id: string) {
    return this.cartService.remove(+id);
  }
}
