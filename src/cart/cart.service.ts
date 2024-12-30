import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCartDto: CreateCartDto) {
    return this.prisma.cart.create({
      data: createCartDto,
    });
  }

  async findByCustomerId(id: number) {
    const carts = await this.prisma.cart.findMany({
      where: {
        customerId: id,
      },
      include: {
        product: true,
      },
    });

    // Calculate total price and quantity
    const totalPrice = carts.reduce((sum, cart) => {
      const prodPrice = cart.product.discountPrice
        ? cart.product.discountPrice
        : cart.product.price;
      return sum + prodPrice * cart.quantity;
    }, 0);
    const totalQuantity = carts.reduce((sum, cart) => sum + cart.quantity, 0);

    return {
      carts,
      totalPrice,
      totalQuantity,
    };
  }

  async update(id: number, updateCartDto: UpdateCartDto) {
    return this.prisma.cart.update({
      where: { id },
      data: updateCartDto,
    });
  }

  async remove(id: number) {
    return this.prisma.cart.delete({
      where: { id },
    });
  }
}
