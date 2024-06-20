import { Module, forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [forwardRef(() => UserModule), forwardRef(() => AuthModule)],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
