import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import {
  CommentArticleParamDto,
  CommentParamDto,
} from './dtos/comment-param.dto';
import { CommentDto } from './dtos/comment.dto';
import { IComment } from './interfaces/comment.interface';
import { CommentService } from './comment.service';
import { ArticleParamDto } from '../article/dtos/article-param.dto';
import { ArticleService } from '../article/article.service';

@Controller('articles')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    private readonly articleService: ArticleService
  ) {}

  @Get(':slug/comments')
  async getComments(): Promise<IComment[]> {
    return await this.commentService.getComments();
  }

  @Get(':slug/comments/:id')
  async getComment(
    @Param() { id, slug }: CommentArticleParamDto
  ): Promise<IComment> {
    return await this.commentService.getComment({
      where: {
        Articles: {
          slug,
        },
        id,
      },
    });
  }

  @Post(':slug/comments')
  async createComment(
    @Body() createCommentDto: CommentDto,
    @Param() { slug }: ArticleParamDto
  ): Promise<IComment> {
    const article = await this.articleService.getArticle({
      where: {
        slug,
      },
    });

    const authorId = createCommentDto['authorId'];

    return await this.commentService.createComment({
      data: {
        body: createCommentDto.body,
        articleId: article.id,
        authorId,
      },
    });
  }

  @Delete(':slug/comments/:id')
  async deleteComment(@Param() { id }: CommentParamDto): Promise<IComment> {
    return await this.commentService.deleteComment({ where: { id } });
  }
}
