import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { ArticleRepository } from './article.repository';

@Module({
  providers: [ArticleService, ArticleRepository],
  controllers: [ArticleController],
  exports: [ArticleService],
})
export class ArticleModule {}
