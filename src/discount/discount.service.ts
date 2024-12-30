import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { DiscountQueryDto } from './dto/discount-query.dto';

@Injectable()
export class DiscountService {
  constructor(private readonly prisma: PrismaService) {}

  // Create a new discount for multiple products
  async createDiscountForProducts(createDiscountDto: CreateDiscountDto) {
    const { percentage, startDate, endDate, productIds, name, desc } =
      createDiscountDto;
    const discount = await this.prisma.discount.create({
      data: {
        percentage,
        startDate,
        endDate,
        name,
        desc,
        productDiscount: {
          create: productIds.map((productId) => ({ productId })),
        },
      },
    });
    return discount;
  }

  // Apply active discounts
  async applyDiscounts() {
    const now = new Date();

    // Find active discounts
    const activeDiscounts = await this.prisma.discount.findMany({
      where: {
        startDate: { lte: now },
        endDate: { gte: now },
      },
      include: {
        productDiscount: { include: { product: true } },
      },
    });

    const updateJobs = [];

    // Apply discounts to products
    for (const discount of activeDiscounts) {
      for (const productDiscount of discount.productDiscount) {
        const newPrice =
          productDiscount.product.price * (1 - discount.percentage / 100);
        const job = this.prisma.product.update({
          where: { id: productDiscount.productId },
          data: { discountPrice: newPrice },
        });
        updateJobs.push(job);
      }
    }

    return Promise.all(updateJobs);
  }

  // Revert expired discounts
  async revertExpiredDiscounts() {
    const now = new Date();

    // Find expired discounts
    const expiredDiscounts = await this.prisma.discount.findMany({
      where: {
        endDate: { lt: now },
      },
      include: {
        productDiscount: { include: { product: true } },
      },
    });

    const updateJobs = [];
    // Revert prices for expired discounts
    for (const discount of expiredDiscounts) {
      for (const productDiscount of discount.productDiscount) {
        const job = this.prisma.product.update({
          where: { id: productDiscount.productId },
          data: { discountPrice: null },
        });
        updateJobs.push(job);
      }
    }

    return Promise.all(updateJobs);
  }

  // Cron job to handle discounts automatically
  @Cron(CronExpression.EVERY_MINUTE) // Runs every minute
  async handleDiscounts() {
    console.log('Checking for active discounts...');
    await this.applyDiscounts();
    await this.revertExpiredDiscounts();
  }

  async getAllDiscounts(query: DiscountQueryDto) {
    const { page = 1, limit = 10, search, startDate, endDate, active } = query;

    const skip = (page - 1) * limit;

    // Build the filtering conditions
    const filters: any = {};

    if (search) {
      filters.name = {
        contains: search, // Case-insensitive search by name
        // mode: 'insensitive',
      };
    }

    if (startDate || endDate) {
      filters.startDate = {
        ...(startDate && { gte: new Date(startDate) }),
        ...(endDate && { lte: new Date(endDate) }),
      };
    }

    if (active !== undefined) {
      filters.active = active;
    }
    console.log(filters);
    // Fetch discounts with pagination and filtering
    const [discounts, total] = await Promise.all([
      this.prisma.discount.findMany({
        where: filters,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' }, // Order by most recent
      }),
      this.prisma.discount.count({
        where: filters,
      }),
    ]);

    return {
      total,
      page,
      totalPages: Math.ceil(total / limit),
      discounts,
    };
  }

  async findOne(id: number) {
    return this.prisma.discount.findFirst({
      where: { id },
      include: {
        productDiscount: {
          select: {
            product: true,
          },
        },
      },
    });
  }
}
