import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { CartModule } from 'src/cart/cart.module';

@Module({
  imports: [PrismaModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
