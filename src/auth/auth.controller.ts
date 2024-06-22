import { AuthService } from './auth.service';
import { UserService } from './../user/user.service';
import { BadRequestException, Body, Controller, Post, Headers, UseGuards, Req, UseInterceptors, UploadedFile } from "@nestjs/common";
import { AuthLoginDTO } from "./dto/auth.dto";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import { AuthForgetDTO } from "./dto/auth-fotget.dto";
import { AuthResetDTO } from "./dto/auth-reset.dto";
import { AuthGuard } from 'src/guards/auth.guard';
import { User } from 'src/decorators/user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { FileService } from 'src/file/file.service';

@Controller("auth")
export class AuthController {

    constructor(private readonly userService: UserService,
        private readonly authService: AuthService,
        private readonly fileService: FileService
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
    async me(@User() user) {
        return { user };
    }

    @UseInterceptors(FileInterceptor('file'))
    @UseGuards(AuthGuard)
    @Post('photo')
    async uploadPhoto(@User() user, @UploadedFile() photo: Express.Multer.File) {
        
        const path = await join(__dirname, '..', '../', 'storage', 'photos', `photo-${user.id}.png`)

        try {
            await  this.fileService.uploadPhoto(photo, path)

            return {success: true}
        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    @Post('reset')
    async reset(@Body() {password, token}: AuthResetDTO){
        return this.authService.reset(password, token)
    }
}