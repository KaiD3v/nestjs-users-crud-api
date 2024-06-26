import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../prisma/prisma.service";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import { UserService } from "../user/user.service";
import { User } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class AuthService {
    constructor(
        private readonly JWTService: JwtService, 
        private readonly prisma: PrismaService,
        private readonly userService: UserService,
        private readonly mailer:MailerService
    ){}

    async createToken(user: User) {
        return {
           accessToken: this.JWTService.sign({
            id: user.id,
            name: user.name, 
            email: user.email 
        }, 
        {
            expiresIn: "7d",
            subject: String(user.id),
            issuer: "login",
            audience: 'users'
        })
        }
    }

    async checkToken(token: string) {
        try {
          return this.JWTService.verify(token, {
            audience: 'users',
            issuer: 'login'
          });
        } catch (error) {
          throw new UnauthorizedException('Invalid token');
        }
      }

      async login(email: string, password: string) {
        const user = await this.prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            throw new UnauthorizedException("E-mail ou senha incorretos.");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException("E-mail ou senha incorretos.");
        }

        return this.createToken(user);
    }

    async register(data: AuthRegisterDTO) {
        const user = await this.userService.create(data);
        return this.createToken(user);
    }

    async forget(email: string){
        const user = await this.prisma.user.findFirst({
            where: { email }
        });

        if(!user){
            throw new UnauthorizedException("E-mail Incorreto.")
        }

        const token = this.JWTService.sign({
            id: user.id
        }, {
            expiresIn: '30 minutes',
            issuer: 'forget',
            audience: 'users'
        })

        await this.mailer.sendMail({
            subject: "Recuperação de senha",
            to: user.email,
            template: "forget",
            context: {
                name: user.name,
                token: token
            }
        })

        return true;
    }

    async reset(password:string, token: string){
        const id = '0'; 
        await this.prisma.user.update({
            where: { id },
            data: { password }
        });

        return true;
    }

    isValidToken(token: string){
        try {
            this.checkToken(token);
            return true;
        } catch (error) {
            return false;            
        }
    }
}
