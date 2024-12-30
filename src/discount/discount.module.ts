import { Module } from '@nestjs/common';
import { DiscountService } from './discount.service';
import { PrismaService } from '../prisma/prisma.service';
import { DiscountController } from './discount.controller';

@Module({
  providers: [DiscountService, PrismaService],
  controllers: [DiscountController],
})
export class DiscountModule {}
