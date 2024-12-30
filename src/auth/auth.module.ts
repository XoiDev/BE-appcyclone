import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtStrategy } from './jwt.strategy';
import { CustomerService } from 'src/customer/customer.service';

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: 'yourSecretKey', // Replace with a secure key or use environment variables
      signOptions: { expiresIn: '1h' }, // Token expiration
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, CustomerService, JwtStrategy],
})
export class AuthModule {}
