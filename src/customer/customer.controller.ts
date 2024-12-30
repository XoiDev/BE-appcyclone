import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import {
  PrivateRouteAnyRole,
  PrivateRouteCustomer,
  PrivateRouteAdmin,
} from 'src/shared/decorators/private-route.decorator';

@ApiTags('Customers')
@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new customer' })
  @ApiResponse({ status: 201, description: 'Customer successfully created.' })
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all customers' })
  @ApiResponse({ status: 200, description: 'List of all customers.' })
  @PrivateRouteAdmin()
  async findAll() {
    return this.customerService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a customer by ID' })
  @ApiResponse({ status: 200, description: 'Customer details.' })
  @ApiResponse({ status: 404, description: 'Customer not found.' })
  @PrivateRouteAnyRole()
  async findOne(@Param('id') id: string) {
    return this.customerService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a customer' })
  @ApiResponse({ status: 200, description: 'Customer successfully updated.' })
  @ApiResponse({ status: 404, description: 'Customer not found.' })
  @PrivateRouteCustomer()
  async update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customerService.update(+id, updateCustomerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a customer' })
  @ApiResponse({ status: 200, description: 'Customer successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Customer not found.' })
  @PrivateRouteAdmin()
  async remove(@Param('id') id: string) {
    return this.customerService.remove(+id);
  }
}
