import { AuthService } from './auth.service';
import { UserService } from './../user/user.service';
import { BadRequestException, Body, Controller, Post } from "@nestjs/common";
import { AuthLoginDTO } from "./dto/auth.dto";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import { AuthForgetDTO } from "./dto/auth-fotget.dto";
import { AuthResetDTO } from "./dto/auth-reset.dto";

@Controller("auth")
export class AuthController {

    constructor(private readonly userService: UserService,
        private readonly authService: AuthService
    ){}

    @Post('login')
    async login(@Body() {email, password}:AuthLoginDTO){
        return this.authService.login(email, password)
    }

    @Post('register')
    async register (@Body() body: AuthRegisterDTO) {
        return this.authService.register(body)
    }

    @Post('forget')
    async forget(@Body() {email}:AuthForgetDTO){
        return this.authService.forget(email)
    }
    @Post('me')
    async me(@Body() body) {
        const token = body.token;
        if (!token) {
            throw new BadRequestException('Token is required');
        }

        try {
            const user = await this.authService.checkToken(token);
            return user;
        } catch (error) {
            throw new BadRequestException('Invalid token');
        }
    }

    @Post('reset')
    async reset(@Body() {password, token}: AuthResetDTO){
        return this.authService.reset(password, token)
    }
}