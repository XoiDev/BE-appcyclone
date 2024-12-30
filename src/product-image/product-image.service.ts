import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductImageDto } from './dto/create-product-image.dto';
import { UpdateProductImageDto } from './dto/update-product-image.dto';

@Injectable()
export class ProductImageService {
  constructor(private readonly prisma: PrismaService) {}

  // Add a new image to a product
  async addImage(createImageDto: CreateProductImageDto) {
    const { productId, urls } = createImageDto;

    // Check if the product exists
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    const jobs = [];
    for (const url of urls) {
      const job = this.prisma.productImage.upsert({
        where: {
          product_url_unique: {
            url,
            productId,
          },
        },
        update: {},
        create: {
          url,
          productId,
        },
      });

      jobs.push(job);
    }

    return Promise.all(jobs);
  }

  // Update an existing product image
  async updateImage(imageId: number, updateImageDto: UpdateProductImageDto) {
    const image = await this.prisma.productImage.findUnique({
      where: { id: imageId },
    });
    if (!image) {
      throw new NotFoundException('Product image not found');
    }

    return this.prisma.productImage.update({
      where: { id: imageId },
      data: {
        ...updateImageDto,
      },
    });
  }

  // Delete a product image
  async deleteImage(imageId: number) {
    const image = await this.prisma.productImage.findUnique({
      where: { id: imageId },
    });
    if (!image) {
      throw new NotFoundException('Product image not found');
    }

    return this.prisma.productImage.delete({
      where: { id: imageId },
    });
  }

  // Fetch all images for a product
  async getImagesByProduct(productId: number) {
    return this.prisma.productImage.findMany({
      where: { productId },
    });
  }
}
