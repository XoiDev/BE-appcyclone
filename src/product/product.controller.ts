import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PrivateRouteAdmin } from 'src/shared/decorators/private-route.decorator';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductQueryDto } from './dto/product-query.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './product.service';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { Role } from 'src/shared/enum/roles.enum';

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({ status: 201, description: 'Product successfully created.' })
  @PrivateRouteAdmin()
  @Roles(Role.ADMIN)
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get products with filters, sorting, and pagination',
  })
  @ApiResponse({
    status: 200,
    description: 'List of products with applied filters.',
  })
  async findAll(@Query() query: ProductQueryDto) {
    return this.productService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product by ID' })
  @ApiResponse({ status: 200, description: 'Product details.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  async findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a product' })
  @ApiResponse({ status: 200, description: 'Product successfully updated.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  @PrivateRouteAdmin()
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product' })
  @ApiResponse({ status: 200, description: 'Product successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  @PrivateRouteAdmin()
  async remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
