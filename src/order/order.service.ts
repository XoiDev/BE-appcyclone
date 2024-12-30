import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderQueryDto } from './dto/order-query.dto';
import { Cart, Product } from '@prisma/client';
import { CartService } from 'src/cart/cart.service';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto) {
    const { customerId, discountCode } = createOrderDto;
    if (discountCode) {
      return await this.createOrderFromCartWithDiscount(
        customerId,
        discountCode,
      );
    }

    return await this.createOrderFromCart(customerId);
  }

  async findAll(query: OrderQueryDto) {
    const {
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      customerName,
    } = query;

    const skip = (page - 1) * limit;

    // Build filters dynamically
    const filters: any = {};

    if (customerName) {
      filters.customer = { name: customerName }; // Use relationship filtering
    }

    // Fetch orders with Prisma
    const [orders, total] = await Promise.all([
      this.prisma.order.findMany({
        where: filters,
        orderBy: { [sortBy]: sortOrder },
        skip,
        take: limit,
        include: {
          customer: true, // Include customer details in response
        },
      }),
      this.prisma.order.count({
        where: filters,
      }),
    ]);

    return {
      data: orders,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: number) {
    return await this.prisma.order.findUnique({
      where: { id },
      include: {
        lineOrder: {
          include: {
            product: true,
          },
        },
        customer: true,
        discountCode: true,
      },
    });
  }

  async createOrderFromCart(customerId: number) {
    // Fetch all cart items for the given customer
    const carts = await this.prisma.cart.findMany({
      where: { customerId },
      include: { product: true }, // Include product details for additional context if needed
    });

    if (carts.length === 0) {
      throw new NotFoundException('No cart items found for this customer.');
    }

    // Calculate total price and quantity
    const totalPrice = carts.reduce((sum, cart) => {
      return sum + this.getProductPriceInCart(cart) * cart.quantity;
    }, 0);
    const totalQuantity = carts.reduce((sum, cart) => sum + cart.quantity, 0);

    // Create line orders for each cart item
    const lineOrders = carts.map((cart) => ({
      quantity: cart.quantity,
      price: this.getProductPriceInCart(cart) * cart.quantity,
      productId: cart.productId,
    }));

    // Create the order
    const order = await this.prisma.order.create({
      data: {
        customerId,
        totalPrice,
        quantity: totalQuantity,
        lineOrder: {
          createMany: {
            data: lineOrders,
          },
        },
      },
      include: {
        lineOrder: true,
      },
    });

    // Clear the customer's cart
    await this.prisma.cart.deleteMany({
      where: { customerId },
    });

    return order;
  }

  async createOrderFromCartWithDiscount(
    customerId: number,
    discountCode: string,
  ) {
    // Fetch discount code details
    const discount = await this.prisma.discountCode.findUnique({
      where: { code: discountCode },
      include: { productDiscountCodes: true },
    });

    if (!discount || !discount.isActive || discount.numberCodeApply === 0) {
      throw new NotFoundException('Invalid or inactive discount code.');
    }

    // Fetch all cart items for the given customer
    const carts = await this.prisma.cart.findMany({
      where: { customerId },
      include: { product: true },
    });

    if (carts.length === 0) {
      throw new NotFoundException('No cart items found for this customer.');
    }

    // Validate that all cart products are eligible for the discount
    const discountProductIds = discount.productDiscountCodes.map(
      (p) => p.productId,
    );
    const eligibleCarts = carts.filter((cart) =>
      discountProductIds.includes(cart.productId),
    );
    const ineligibleCarts = carts.filter(
      (cart) => !discountProductIds.includes(cart.productId),
    );

    if (ineligibleCarts.length > 0) {
      throw new BadRequestException(
        'Some products in the cart are not eligible for the applied discount code.',
      );
    }

    // Validate that the total cart amount meets the minimum requirement
    const totalCartAmount = eligibleCarts.reduce(
      (sum, cart) => sum + this.getProductPriceInCart(cart) * cart.quantity,
      0,
    );
    if (totalCartAmount < discount.minAmount) {
      throw new BadRequestException(
        `The total amount in the cart must reach at least $${discount.minAmount} to apply this discount code.`,
      );
    }

    // Calculate total price and apply discount
    const discountAmount = totalCartAmount * discount.discountRate;
    const totalPriceAfterDiscount = totalCartAmount - discountAmount;
    const totalQuantity = eligibleCarts.reduce(
      (sum, cart) => sum + cart.quantity,
      0,
    );

    // Create line orders for eligible cart items
    const lineOrders = eligibleCarts.map((cart) => ({
      quantity: cart.quantity,
      price: this.getProductPriceInCart(cart) * cart.quantity,
      productId: cart.productId,
    }));

    // Create the order
    const order = await this.prisma.order.create({
      data: {
        customerId,
        totalPrice: totalPriceAfterDiscount,
        quantity: totalQuantity,
        discountCodeId: discount.id,
        lineOrder: {
          createMany: {
            data: lineOrders,
          },
        },
      },
    });

    // Clear the customer's cart
    await this.prisma.cart.deleteMany({
      where: { customerId },
    });

    if (discount.numberCodeApply > 0) {
      await this.prisma.discountCode.update({
        where: {
          code: discountCode,
        },
        data: {
          numberCodeApply: {
            decrement: 1,
          },
        },
      });
    }

    return {
      message: 'Order created successfully with discount applied!',
      order,
      lineOrders,
      discountApplied: {
        code: discount.code,
        discountRate: discount.discountRate,
        discountAmount,
        totalPriceAfterDiscount,
      },
    };
  }

  getProductPriceInCart(cart: Cart & { product: Product }) {
    return cart.product.discountPrice
      ? cart.product.discountPrice
      : cart.product.price;
  }
}
