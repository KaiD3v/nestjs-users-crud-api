import { INestApplication, Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {

   async onModuleInit() {
        await this.$connect();
        console.log("Database Connected")
    }

    async enableShutdownHooks(app: INestApplication) {
        (this.$on as any)('beforeExit', async () => {
          await app.close();
        });
      }

}