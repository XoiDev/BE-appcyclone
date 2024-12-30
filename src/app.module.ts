import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { ProductModule } from './product/product.module';
import { CustomerModule } from './customer/customer.module';
import { OrderModule } from './order/order.module';
import { UserModule } from './user/user.module';
import { VendorModule } from './vendor/vendor.module';
import { CategoryModule } from './category/category.module';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { DiscountCodeModule } from './discount-code/discount-code.module';
import { ReviewModule } from './review/review.module';
import { ProductImageModule } from './product-image/product-image.module';
import { UploadModule } from './upload/upload.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { DiscountModule } from './discount/discount.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    AuthModule,
    UserModule,
    VendorModule,
    CategoryModule,
    ProductModule,
    CustomerModule,
    OrderModule,
    PrismaModule,
    CartModule,
    DiscountCodeModule,
    ReviewModule,
    ProductImageModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '../images'), // Path to the 'images' folder
      serveRoot: '/images', // Files will be accessible via '/images'
    }),
    UploadModule,
    ScheduleModule.forRoot(),
    DiscountModule,
    AppModule,
  ],
  controllers: [],
  providers: [
    AppService,
    PrismaService,
    // { provide: APP_GUARD, useClass: JwtAuthGuard }, // JWT Authentication
    // { provide: APP_GUARD, useClass: RolesGuard }, // Roles-based Access Control
  ],
})
export class AppModule {}
