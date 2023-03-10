import { PrismaClientService } from '@bris/prisma/server';
import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { IArticle } from './interfaces/article.interface';
import { IBaseRepository } from '../../shared/interfaces/base-repository.interface';
import {
  ArticleFindManyOptions,
  ArticleFindFirstOptions,
  ArticleCreateOptions,
  ArticleUpdateOptions,
  ArticleDeleteOptions,
} from './types/article-options.type';

@Injectable()
export class ArticleRepository implements IBaseRepository<IArticle> {
  private readonly logger = new Logger(ArticleRepository.name);

  constructor(private readonly prismaClient: PrismaClientService) {}

  async findMany(options?: ArticleFindManyOptions): Promise<IArticle[]> {
    return this.prismaClient.articles.findMany(options);
  }

  async findOne(options: ArticleFindFirstOptions): Promise<IArticle> {
    try {
      return await this.prismaClient.articles.findFirstOrThrow(options);
    } catch (err) {
      this.logger.error(err, err.stack);
      if (err.code === 'P2025') {
        throw new NotFoundException({
          message: 'NOT_FOUND',
          description: `Article not found`,
        });
      }
    }
  }

  async create(options: ArticleCreateOptions): Promise<IArticle> {
    try {
      return await this.prismaClient.articles.create(options);
    } catch (err) {
      this.logger.error(err, err.stack);

      if (err.code === 'P2002') {
        throw new ConflictException({
          message: 'CONFLICT',
          description: `Article with this title already exists`,
        });
      }
    }
  }

  async update(options: ArticleUpdateOptions): Promise<IArticle> {
    try {
      return await this.prismaClient.articles.update(options);
    } catch (err) {
      this.logger.error(err, err.stack);

      if (err.code === 'P2025') {
        throw new NotFoundException({
          message: 'NOT_FOUND',
          description: `Article not found`,
        });
      }

      if (err.code === 'P2002') {
        throw new ConflictException({
          message: 'CONFLICT',
          description: `Article with this title already exists`,
        });
      }
    }
  }

  async delete(options: ArticleDeleteOptions): Promise<IArticle> {
    try {
      return await this.prismaClient.articles.delete(options);
    } catch (err) {
      this.logger.error(err, err.stack);
      if (err.code === 'P2025') {
        throw new NotFoundException({
          message: 'NOT_FOUND',
          description: `Article not found`,
        });
      }
    }
  }
}
