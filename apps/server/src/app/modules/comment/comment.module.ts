import { Module } from '@nestjs/common';
import { ArticleModule } from '../article/article.module';
import { CommentController } from './comment.controller';
import { CommentRepository } from './comment.repository';
import { CommentService } from './comment.service';
@Module({
  imports: [ArticleModule],
  providers: [CommentService, CommentRepository],
  controllers: [CommentController],
  exports: [CommentService],
})
export class CommentModule {}
