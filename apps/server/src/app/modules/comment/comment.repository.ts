import { PrismaClientService } from '@bris/prisma/server';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { IBaseRepository } from '../../shared/interfaces/base-repository.interface';
import { IComment } from './interfaces/comment.interface';
import {
  CommentFindManyOptions,
  CommentFindFirstOptions,
  CommentCreateOptions,
  CommentUpdateOptions,
  CommentDeleteOptions,
} from './types/comment-options.type';

@Injectable()
export class CommentRepository implements IBaseRepository<IComment> {
  private readonly logger = new Logger(CommentRepository.name);

  constructor(private readonly prismaClient: PrismaClientService) {}

  async findMany(options?: CommentFindManyOptions): Promise<IComment[]> {
    return this.prismaClient.comments.findMany(options);
  }

  async findOne(options: CommentFindFirstOptions): Promise<IComment> {
    try {
      return await this.prismaClient.comments.findFirstOrThrow(options);
    } catch (err) {
      this.logger.error(err, err.stack);
      if (err.code === 'P2025') {
        throw new NotFoundException({
          message: 'NOT_FOUND',
          description: `Comment not found`,
        });
      }
    }
  }

  async create(options: CommentCreateOptions): Promise<IComment> {
    try {
      return await this.prismaClient.comments.create(options);
    } catch (err) {
      this.logger.error(err, err.stack);
    }
  }

  async update(options: CommentUpdateOptions): Promise<IComment> {
    try {
      return await this.prismaClient.comments.update(options);
    } catch (err) {
      this.logger.error(err, err.stack);

      if (err.code === 'P2025') {
        throw new NotFoundException({
          message: 'NOT_FOUND',
          description: `Comment not found`,
        });
      }
    }
  }

  async delete(options: CommentDeleteOptions): Promise<IComment> {
    try {
      return await this.prismaClient.comments.delete(options);
    } catch (err) {
      this.logger.error(err, err.stack);
      if (err.code === 'P2025') {
        throw new NotFoundException({
          message: 'NOT_FOUND',
          description: `Comment not found`,
        });
      }
    }
  }
}
