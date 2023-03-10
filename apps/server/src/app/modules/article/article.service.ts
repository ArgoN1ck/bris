import { Injectable } from '@nestjs/common';
import { IArticle } from './interfaces/article.interface';
import {
  ArticleCreateOptions,
  ArticleFindManyOptions,
  ArticleFindFirstOptions,
  ArticleUpdateOptions,
  ArticleDeleteOptions,
} from './types/article-options.type';
import { ArticleRepository } from './article.repository';

@Injectable()
export class ArticleService {
  constructor(private readonly articleRepository: ArticleRepository) {}

  async createArticle(options: ArticleCreateOptions): Promise<IArticle> {
    return this.articleRepository.create(options);
  }

  async getArticles(options?: ArticleFindManyOptions): Promise<IArticle[]> {
    return this.articleRepository.findMany(options);
  }

  async getArticle(options: ArticleFindFirstOptions): Promise<IArticle> {
    return this.articleRepository.findOne(options);
  }

  async updateArticle(options: ArticleUpdateOptions): Promise<IArticle> {
    return this.articleRepository.update(options);
  }

  async deleteArticle(options: ArticleDeleteOptions): Promise<IArticle> {
    return this.articleRepository.delete(options);
  }
}
