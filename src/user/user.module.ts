import { forwardRef, MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { UserService } from "./user.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { PrismaService } from "src/prisma/prisma.service";
import { UserController } from "./user.controller";
import { UserIdCheckMiddleware } from "src/middlewares/user-id-check.middleware";
import { AuthModule } from "src/auth/auth.module";

@Module({
    imports: [PrismaModule, forwardRef(() => AuthModule) ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule implements NestModule {

    configure(consumer: MiddlewareConsumer){
        consumer.apply(UserIdCheckMiddleware).forRoutes({
            path: 'users/:id',
            method: RequestMethod.ALL
        })
    }

}