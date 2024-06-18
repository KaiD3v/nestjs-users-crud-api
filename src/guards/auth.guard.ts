import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { AuthService } from "src/auth/auth.service";


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private readonly authService: AuthService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const { authorization } = request.headers;

        if (!authorization) {
            throw new UnauthorizedException('Authorization header is missing');
        }

        const [authType, token] = authorization.split(' ');

        if (authType !== 'Bearer' || !token) {
            throw new UnauthorizedException('Invalid authorization format');
        }

        try {
            return this.authService.isValidToken(token);
        } catch (error) {
            throw new UnauthorizedException('Invalid or expired token');
        }
    }
}