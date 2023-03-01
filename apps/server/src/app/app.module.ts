import { Module } from '@nestjs/common';
import { PrismaClientModule } from '@bris/prisma/server';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { prismaClientConfig } from './config/orm.config';
import { HealthCheckController } from './health-check.controller';

@Module({
  imports: [PrismaClientModule.forRoot(prismaClientConfig)],
  controllers: [AppController, HealthCheckController],
  providers: [AppService],
})
export class AppModule {}
