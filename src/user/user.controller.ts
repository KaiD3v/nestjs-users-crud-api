import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user";

@Controller('users')
export class UserController {
    @Post()
    async create(@Body() {email, name, password}:CreateUserDTO){
        return { email, name, password }
    }
    @Get(':id')
    async readOne(@Param() param){
        return {user: {}, param}
    }
    @Get()
    async readAll(){
        return {users: []}
    }
    @Put(':id')
    async update(@Body() {email, name, password}:UpdatePutUserDTO, @Param() param){
        return {
            method: 'put',
            name, 
            password,
            param
        }
    }
    @Patch(':id')
    async updatePartial(@Body() body:UpdatePatchUserDTO, @Param() param){
        return{
            method: 'patch',
            body,
            param
        }
    }
    @Delete(':id')
    async deleteUser(@Param('id', ParseIntPipe) id) {
        return {
            id
        } 
    }
}