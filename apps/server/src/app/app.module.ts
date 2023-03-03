import { Module } from '@nestjs/common';
import { PrismaClientModule } from '@bris/prisma/server';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { prismaClientConfig } from './config/orm.config';
import { HealthCheckController } from './health-check.controller';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [PrismaClientModule.forRoot(prismaClientConfig), UserModule],
  controllers: [AppController, HealthCheckController],
  providers: [AppService],
})
export class AppModule {}
