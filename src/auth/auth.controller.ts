import {
  Body,
  Controller,
  Post,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PrivateRouteAnyRole } from 'src/shared/decorators/private-route.decorator';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login/admin')
  async loginUser(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(loginDto);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }

  @Post('login/customer')
  async loginCustomer(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateCustomer(loginDto);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }

  @PrivateRouteAnyRole()
  @Post('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
