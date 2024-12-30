import { Controller, Post, Body, Get, Query, Param } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReviewQueryDto } from './dto/review-query.dto';
import { PrivateRouteCustomer } from 'src/shared/decorators/private-route.decorator';
import { GetUserFromReq } from 'src/shared/decorators/get-user-from-req';

@ApiTags('Reviews')
@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product review' })
  @ApiResponse({ status: 201, description: 'Review successfully created.' })
  @ApiResponse({
    status: 400,
    description: 'Validation failed or duplicate review.',
  })
  @PrivateRouteCustomer()
  async createReview(
    @Body() createReviewDto: CreateReviewDto,
    @GetUserFromReq('id') customerId: number,
  ) {
    return this.reviewService.createReview(customerId, createReviewDto);
  }

  @Get('product/:productId')
  @ApiOperation({
    summary:
      'Get reviews for a product with pagination, rating filter, average rating, and rating count',
  })
  @ApiResponse({
    status: 200,
    description: 'List of reviews with rating summary.',
  })
  async getReviewsByProduct(
    @Param('productId') productId: string,
    @Query() query: ReviewQueryDto,
  ) {
    return this.reviewService.getReviewsByProduct(+productId, query);
  }

  @Get('customer')
  @ApiOperation({ summary: 'Get all reviews submitted by a customer' })
  @ApiResponse({ status: 200, description: 'List of reviews by the customer.' })
  @PrivateRouteCustomer()
  async getReviewsByCustomer(@Query('customerId') customerId: number) {
    return this.reviewService.findReviewsByCustomer(+customerId);
  }
}
