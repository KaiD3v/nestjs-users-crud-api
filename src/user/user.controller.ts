import { AuthGuard } from './../guards/auth.guard';
import { UserService } from './user.service';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UseGuards, UseInterceptors } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';
import { LogIniterceptor } from 'src/interceptors/log.interceptor';
import { Rules } from 'src/decorators/rules.decorator';
import { Rule } from 'src/enums/rule.enum';
import { RuleGuard } from 'src/guards/rule.guard';

@UseGuards(AuthGuard, RuleGuard)
@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService){}
   
    @Rules(Rule.Admin)
    @Post()
    async create(@Body() data:CreateUserDTO){
        return this.userService.create(data);
    }
    @Rules(Rule.Admin)
    @Get(':id')
    async readOne(@Param('id') id: string) {
        return this.userService.readOne(id);
    }
    @Rules(Rule.Admin, Rule.User)
    @Get()
    async readAll(){
        return this.userService.readAll()
    }
    @Rules(Rule.Admin)
    @Put(':id')
    async update(@Param('id') id:string, @Body() data:UpdatePutUserDTO){
        return this.userService.update(id, data)
    }
    @Rules(Rule.Admin)
    @Patch(':id')
    async updatePartial(@Body() data:UpdatePatchUserDTO, @Param('id') id:string){
        return this.userService.updatePartial(id, data)
    }
    @Rules(Rule.Admin)
    @Delete(':id')
    async deleteUser(@Param('id') id: string) {
        await this.userService.delete(id)

        return {message: "Usuário deletado com sucesso!", id}
    }
}