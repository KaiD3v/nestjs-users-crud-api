import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth/auth.service'
import { UserService } from '../user/user.service'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<any> {
    const req = await context.switchToHttp().getRequest()
    const {authorization} = await req.headers
    try {
    
        const data = await this.authService.checkToken((authorization ?? '').split(' ')[1])
        req.tokenPayLoad = data

        req.user = await this.userService.readOne(data.id)
        
    return true;
    } catch (error) {
        return false
    }
    
  }
}