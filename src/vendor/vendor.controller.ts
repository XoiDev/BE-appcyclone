import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { VendorService } from './vendor.service';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { PrivateRouteAdmin } from 'src/shared/decorators/private-route.decorator';

@ApiTags('Vendors')
@Controller('vendors')
export class VendorController {
  constructor(private readonly vendorService: VendorService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new vendor' })
  @ApiResponse({ status: 201, description: 'Vendor successfully created.' })
  @PrivateRouteAdmin()
  async create(@Body() createVendorDto: CreateVendorDto) {
    return this.vendorService.create(createVendorDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all vendors' })
  @ApiResponse({ status: 200, description: 'List of all vendors.' })
  async findAll() {
    return this.vendorService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a vendor by ID' })
  @ApiResponse({ status: 200, description: 'Vendor details.' })
  @ApiResponse({ status: 404, description: 'Vendor not found.' })
  async findOne(@Param('id') id: string) {
    return this.vendorService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a vendor' })
  @ApiResponse({ status: 200, description: 'Vendor successfully updated.' })
  @ApiResponse({ status: 404, description: 'Vendor not found.' })
  @PrivateRouteAdmin()
  async update(
    @Param('id') id: string,
    @Body() updateVendorDto: UpdateVendorDto,
  ) {
    return this.vendorService.update(+id, updateVendorDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a vendor' })
  @ApiResponse({ status: 200, description: 'Vendor successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Vendor not found.' })
  @PrivateRouteAdmin()
  async remove(@Param('id') id: string) {
    return this.vendorService.remove(+id);
  }
}
