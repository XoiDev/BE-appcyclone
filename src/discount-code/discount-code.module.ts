import { Module } from '@nestjs/common';
import { DiscountCodeService } from './discount-code.service';
import { DiscountCodeController } from './discount-code.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [DiscountCodeController],
  providers: [DiscountCodeService],
})
export class DiscountCodeModule {}
