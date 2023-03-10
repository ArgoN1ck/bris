import { Injectable } from '@nestjs/common';
import { IComment } from './interfaces/comment.interface';
import {
  CommentCreateOptions,
  CommentFindManyOptions,
  CommentFindFirstOptions,
  CommentUpdateOptions,
  CommentDeleteOptions,
} from './types/comment-options.type';
import { CommentRepository } from './comment.repository';

@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepository) {}

  async createComment(options: CommentCreateOptions): Promise<IComment> {
    return this.commentRepository.create(options);
  }

  async getComments(options?: CommentFindManyOptions): Promise<IComment[]> {
    return this.commentRepository.findMany(options);
  }

  async getComment(options: CommentFindFirstOptions): Promise<IComment> {
    return this.commentRepository.findOne(options);
  }

  async updateComment(options: CommentUpdateOptions): Promise<IComment> {
    return this.commentRepository.update(options);
  }

  async deleteComment(options: CommentDeleteOptions): Promise<IComment> {
    return this.commentRepository.delete(options);
  }
}
