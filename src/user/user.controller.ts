import { UserService } from './user.service';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UseInterceptors } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';
import { LogIniterceptor } from 'src/interceptors/log.interceptor';


@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService){}

    @UseInterceptors(LogIniterceptor)
    @Post()
    async create(@Body() data:CreateUserDTO){
        return this.userService.create(data);
    }
    @Get(':id')
    async readOne(@Param('id') id: string) {
        return this.userService.readOne(id);
    }
    @Get()
    async readAll(){
        return this.userService.readAll()
    }
    @Put(':id')
    async update(@Param('id') id:string, @Body() data:UpdatePutUserDTO){
        return this.userService.update(id, data)
    }
    @Patch(':id')
    async updatePartial(@Body() data:UpdatePatchUserDTO, @Param('id') id:string){
        return this.userService.updatePartial(id, data)
    }
    @Delete(':id')
    async deleteUser(@Param('id') id: string) {
        await this.userService.delete(id)

        return {message: "Usuário deletado com sucesso!", id}
    }
}