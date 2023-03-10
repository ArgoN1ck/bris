import { Module } from '@nestjs/common';
import { PrismaClientModule } from '@bris/prisma/server';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { prismaClientConfig } from './config/orm.config';
import { HealthCheckController } from './health-check.controller';
import { UserModule } from './modules/user/user.module';
import { ProfileModule } from './modules/profile/profile.module';
import { ArticleModule } from './modules/article/article.module';
import { CommentModule } from './modules/comment/comment.module';

@Module({
  imports: [
    PrismaClientModule.forRoot(prismaClientConfig),

    UserModule,
    ProfileModule,
    ArticleModule,
    CommentModule,
  ],
  controllers: [AppController, HealthCheckController],
  providers: [AppService],
})
export class AppModule {}
