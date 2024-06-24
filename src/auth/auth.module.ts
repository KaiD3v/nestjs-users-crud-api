import { forwardRef, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { UserModule } from "../user/user.module";
import { PrismaModule } from "../prisma/prisma.module";
import { AuthService } from "./auth.service";
import { FileModule } from "../file/file.module";


@Module({
    imports: [
        JwtModule.register({
        secret: "SAMGBVHpEvtCUakznZrDgyqQiWFhcwPXiYyqxdsNOuWV"
    }),
    forwardRef(() => UserModule),
    PrismaModule,
    FileModule
],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService]
})
export class AuthModule {}