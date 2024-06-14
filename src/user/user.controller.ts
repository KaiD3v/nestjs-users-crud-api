import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from "@nestjs/common";

@Controller('users')
export class UserController {
    @Post()
    async create(@Body() body){
        return { body }
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
    async update(@Body() body, @Param() param){
        return {
            method: 'put',
            body,
            param
        }
    }
    @Patch(':id')
    async updatePartial(@Body() body, @Param() param){
        return{
            method: 'patch',
            body,
            param
        }
    }
    @Delete(':id')
    async deleteUser(@Param() param) {
        return {
            user: param,
            message: 'Deletado'
        } 
    }
}