import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ROLES_KEY } from './roles.decorator';
import { Role } from './role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // If no roles are required, allow access
    if (!requiredRoles) {
      return true;
    }

    // Get the request object
    const request = context.switchToHttp().getRequest();

    // Get the access token from the request headers
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return false; // Access denied if no token is provided
    }

    // Extract the token from the authorization header
    const token = authHeader.split(' ')[1];

    try {
      // Verify and decode the token to get the payload
      const payload = this.jwtService.verify(token);

      // Extract the user role from the payload
      const userRole = payload.roles;

      // Check if the user role is included in the required roles
      return requiredRoles.includes(userRole);
    } catch (error) {
      return false; // Access denied if token is invalid
    }
  }
}
