import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewQueryDto } from './dto/review-query.dto';

@Injectable()
export class ReviewService {
  constructor(private readonly prisma: PrismaService) {}

  async createReview(customerId: number, dto: CreateReviewDto) {
    const { productId, rating, comment } = dto;

    // Check if the customer has purchased the product
    const hasPurchased = await this.prisma.lineOrder.findFirst({
      where: {
        productId,
        order: { customerId },
      },
    });

    if (!hasPurchased) {
      throw new BadRequestException(
        'You can only review products you have purchased.',
      );
    }

    // Check if the product has already been reviewed by the customer
    const existingReview = await this.prisma.review.findUnique({
      where: {
        customerId_productId: { customerId, productId },
      },
    });

    if (existingReview) {
      throw new BadRequestException('You have already reviewed this product.');
    }

    // Create the review
    const review = await this.prisma.review.create({
      data: {
        rating,
        comment,
        customerId,
        productId,
      },
    });

    // Recalculate the average rating for the product
    const { _avg } = await this.prisma.review.aggregate({
      _avg: { rating: true },
      where: { productId },
    });

    const newAverageRating = _avg.rating || 0;

    const product = await this.prisma.product.update({
      where: { id: productId },
      data: { rating: newAverageRating },
    });

    return {
      message: 'Review created successfully and product rating updated.',
      review,
      product,
    };
  }

  // Fetch reviews with pagination, optional rating filter, average rating, and review count by rating
  async getReviewsByProduct(productId: number, query: ReviewQueryDto) {
    const { page = 1, limit = 10, rating } = query;

    const skip = (page - 1) * limit;

    // Build filters dynamically
    const filters: any = { productId };
    if (rating) {
      filters.rating = rating; // Add rating filter
    }

    // Fetch paginated reviews, total count, average rating, and grouped rating counts
    const [reviews, totalReviews, avgRating, ratingCounts] = await Promise.all([
      // 1. Paginated reviews
      this.prisma.review.findMany({
        where: filters,
        skip,
        take: limit,
        include: {
          customer: {
            select: { name: true, avatar: true }, // Include customer details
          },
        },
        orderBy: { createdAt: 'desc' }, // Sort by latest reviews
      }),

      // 2. Total count of reviews
      this.prisma.review.count({ where: filters }),

      // 3. Average rating for the product
      this.prisma.product.findFirst({
        select: { rating: true },
        where: { id: productId },
      }),

      // 4. Count of reviews grouped by rating
      this.prisma.review.groupBy({
        by: ['rating'],
        _count: true,
        where: { productId }, // Count only reviews for the specified product
      }),
    ]);

    // Convert grouped rating counts into a user-friendly format
    const ratingSummary = [1, 2, 3, 4, 5].map((star) => {
      const count = ratingCounts.find((r) => r.rating === star)?._count || 0;
      return { rating: star, count };
    });

    return {
      reviews,
      total: totalReviews,
      page,
      totalPages: Math.ceil(totalReviews / limit),
      averageRating: avgRating.rating || 0,
      ratingSummary, // Count of reviews by each star rating
    };
  }

  async findReviewsByCustomer(customerId: number) {
    return this.prisma.review.findMany({
      where: { customerId },
      include: {
        product: { select: { name: true, thumbnail: true } }, // Include product details
      },
    });
  }
}
