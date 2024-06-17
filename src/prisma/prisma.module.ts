import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";

@Module({
    providers: [PrismaService], // declara que prisma service faz parte deste modulo
    exports: [PrismaService] // exporta pra que seja usado em outros lugares
})

export class PrismaModule {}