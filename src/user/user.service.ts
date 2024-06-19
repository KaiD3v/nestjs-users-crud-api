import { Injectable, NotFoundException, ConflictException } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";

@Injectable()
export class UserService {

    constructor(private prisma: PrismaService) {}

    async create({ email, name, password }: CreateUserDTO) {
        const existingUser = await this.prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            throw new ConflictException(`User with email ${email} already exists`);
        }

        return this.prisma.user.create({
            data: {
                name,
                email,
                password,
            },
        });
    }

    async readAll() {
        const users = await this.prisma.user.findMany();
        if (users.length === 0) {
            return { message: "Ainda não há nenhum usuário." };
        }
        return users;
    }

    async readOne(id: string) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }

    async update(id: string, data: UpdatePutUserDTO) {
        await this.ensureUserExists(id);
        const updatedUser = await this.prisma.user.update({
            where: {
                id,
            },
            data: {
                ...data,
            },
        });
        return updatedUser;
    }

    async updatePartial(id: string, data: UpdatePatchUserDTO) {
        await this.ensureUserExists(id);
        const updatedUser = await this.prisma.user.update({
            where: {
                id,
            },
            data,
        });
        return updatedUser;
    }

    async delete(id: string) {
        await this.ensureUserExists(id);
        return this.prisma.user.delete({
            where: {
                id,
            },
        });
    }

    private async ensureUserExists(id: string) {
        const user = await this.readOne(id);
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
    }
}
