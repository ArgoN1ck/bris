import { IComment } from '../interfaces/comment.interface';

export class CommentDto implements Pick<IComment, 'body'> {
  body: string;
}
