import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth/auth.service'
import { UserService } from '../user/user.service'
import { Reflector } from '@nestjs/core';
import { RULES_KEY } from 'src/decorators/rules.decorator';
import { Rule } from 'src/enums/rule.enum';

@Injectable()
export class RuleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,

  ) {}

  async canActivate(context: ExecutionContext): Promise<any> {
    
    const requiredRules = this.reflector.getAllAndOverride<Rule[]>(RULES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);

      if(!requiredRules){
        return true
      }

    const {user} = await context.switchToHttp().getRequest()
    console.log({requiredRules, user})  

    const filteredRules = requiredRules.filter(rule => rule === user.rule)

    return filteredRules.length > 0

    
  }
}