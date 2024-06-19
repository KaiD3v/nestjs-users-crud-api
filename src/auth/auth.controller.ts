import { AuthService } from './auth.service';
import { UserService } from './../user/user.service';
import { BadRequestException, Body, Controller, Post, Headers, UseGuards, Req } from "@nestjs/common";
import { AuthLoginDTO } from "./dto/auth.dto";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import { AuthForgetDTO } from "./dto/auth-fotget.dto";
import { AuthResetDTO } from "./dto/auth-reset.dto";
import { AuthGuard } from 'src/guards/auth.guard';

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

    @UseGuards(AuthGuard)
    @Post('me')
    async me(@Req() req:any) {
        return { me: 'ok', data: req.tokenPayLoad };
    }

    @Post('reset')
    async reset(@Body() {password, token}: AuthResetDTO){
        return this.authService.reset(password, token)
    }
}