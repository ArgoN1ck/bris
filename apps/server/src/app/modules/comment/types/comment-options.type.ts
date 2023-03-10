import { Prisma } from '@prisma/client';

export type CommentCreateOptions = Prisma.CommentsCreateArgs;
export type CommentFindFirstOptions = Prisma.CommentsFindFirstOrThrowArgs;
export type CommentFindManyOptions = Prisma.CommentsFindManyArgs;
export type CommentUpdateOptions = Prisma.CommentsUpdateArgs;
export type CommentDeleteOptions = Prisma.CommentsDeleteArgs;
