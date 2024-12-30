import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductQueryDto } from './dto/product-query.dto';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    return this.prisma.product.create({ data: createProductDto });
  }

  async findAll(query: ProductQueryDto) {
    const {
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      name,
      vendorId,
      categoryId,
    } = query;

    const skip = (page - 1) * limit;

    // Build the filtering conditions dynamically
    const filters: any = {};
    if (name) {
      filters.name = { contains: name }; // Case-insensitive search
    }
    if (vendorId) {
      filters.vendorId = +vendorId;
    }
    if (categoryId) {
      filters.categoryId = +categoryId;
    }

    // Fetch products with Prisma
    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where: filters,
        orderBy: { [sortBy]: sortOrder },
        skip,
        take: +limit,
      }),
      this.prisma.product.count({ where: filters }),
    ]);

    return {
      data: products,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: number) {
    return this.prisma.product.findUnique({
      where: { id },
      include: {
        productImage: {
          select: {
            id: true,
            url: true,
          },
        },
      },
    });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  async remove(id: number) {
    return this.prisma.product.delete({ where: { id } });
  }
}
