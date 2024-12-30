import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDiscountCodeDto } from './dto/create-discount-code.dto';
import { UpdateDiscountCodeDto } from './dto/update-discount-code.dto';
import { DiscountCodeQueryDto } from './dto/discount-code-query.dto';

@Injectable()
export class DiscountCodeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDiscountCodeDto: CreateDiscountCodeDto) {
    const { productIds, ...data } = createDiscountCodeDto;

    return this.prisma.discountCode.create({
      data: {
        ...data,
        code: this.code(),
        productDiscountCodes: {
          createMany: {
            data: productIds.map((productId) => ({ productId })),
          },
        },
      },
    });
  }

  async findAll(query: DiscountCodeQueryDto) {
    const {
      page = 1,
      limit = 10,
      code,
      active,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = query;

    const skip = (page - 1) * limit;

    // Build filters dynamically
    const filters: any = {};
    if (code) {
      filters.code = { contains: code, mode: 'insensitive' }; // Case-insensitive search
    }
    if (active !== undefined) {
      filters.isActive = active;
    }

    // Fetch data with Prisma
    const [discountCodes, total] = await Promise.all([
      this.prisma.discountCode.findMany({
        where: filters,
        orderBy: { [sortBy]: sortOrder },
        skip,
        take: limit,
      }),
      this.prisma.discountCode.count({ where: filters }),
    ]);

    return {
      data: discountCodes,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: number) {
    const discountCode = await this.prisma.discountCode.findUnique({
      where: { id },
      include: { productDiscountCodes: true },
    });

    if (!discountCode) {
      throw new NotFoundException('Discount code not found.');
    }

    return discountCode;
  }

  async findOneByCode(code: string) {
    const discountCode = await this.prisma.discountCode.findUnique({
      where: { code },
      include: {
        productDiscountCodes: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!discountCode) {
      throw new NotFoundException('Discount code not found.');
    }

    return discountCode;
  }

  async update(id: number, updateDiscountCodeDto: UpdateDiscountCodeDto) {
    const { productIds, ...data } = updateDiscountCodeDto;

    return this.prisma.discountCode.update({
      where: { id },
      data: {
        ...data,
        productDiscountCodes: {
          set: productIds.map((id) => ({ id })),
        },
      },
    });
  }

  async remove(id: number) {
    return this.prisma.discountCode.delete({
      where: { id },
    });
  }

  code() {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 10) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }
}
