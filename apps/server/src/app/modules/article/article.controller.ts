import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ArticleParamDto } from './dtos/article-param.dto';
import { ArticleDto } from './dtos/article.dto';
import { IArticle } from './interfaces/article.interface';
import { ArticleService } from './article.service';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  async getArticles(): Promise<IArticle[]> {
    return await this.articleService.getArticles();
  }

  @Get(':slug')
  async getArticle(@Param() { slug }: ArticleParamDto): Promise<IArticle> {
    return await this.articleService.getArticle({
      where: { slug },
      include: { Profiles: true },
    });
  }

  @Post()
  async createArticle(@Body() createArticleDto: ArticleDto): Promise<IArticle> {
    const { title } = createArticleDto;

    return await this.articleService.createArticle({
      data: {
        ...createArticleDto,
        slug: title.replace(' ', '-'),
      },
      include: { Profiles: true },
    });
  }

  @Put(':slug')
  async updateArticle(
    @Param() { slug }: ArticleParamDto,
    @Body() updateArticleDto: ArticleDto
  ): Promise<IArticle> {
    return await this.articleService.updateArticle({
      where: { slug },
      data: updateArticleDto,
    });
  }

  @Delete(':slug')
  async deleteArticle(@Param() { slug }: ArticleParamDto): Promise<IArticle> {
    return await this.articleService.deleteArticle({ where: { slug } });
  }
}
