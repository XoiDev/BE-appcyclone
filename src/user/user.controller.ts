import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PrivateRouteAdmin } from 'src/shared/decorators/private-route.decorator';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'List of all users.' })
  @PrivateRouteAdmin()
  async getUsers() {
    return this.userService.getUsers();
  }

  @ApiOperation({ summary: 'Create a new customer' })
  @ApiResponse({ status: 201, description: 'Customer successfully created.' })
  @Post()
  async createUser(@Body() data: CreateUserDto) {
    return this.userService.createUser(data);
  }
}
