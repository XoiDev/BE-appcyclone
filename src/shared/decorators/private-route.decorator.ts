import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from './roles.decorator';
import { Role } from '../enum/roles.enum';
import { RolesGuard } from '../../auth/roles.guard';

export function PrivateRouteAnyRole() {
  return applyDecorators(UseGuards(JwtAuthGuard), ApiBearerAuth());
}

export function PrivateRouteAdmin() {
  return applyDecorators(
    UseGuards(JwtAuthGuard),
    UseGuards(RolesGuard),
    Roles(Role.ADMIN),
    ApiBearerAuth(),
  );
}

export function PrivateRouteCustomer() {
  return applyDecorators(
    UseGuards(JwtAuthGuard),
    UseGuards(RolesGuard),
    Roles(Role.CUSTOMER),
    ApiBearerAuth(),
  );
}
