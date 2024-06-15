import { Injectable } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UserService {

    constructor(private prisma: PrismaService){}

    async create({email, name, password}:CreateUserDTO){
        return this.prisma.user.create({
            data: {
                name,
                email, 
                password
            }
        })
    }

}