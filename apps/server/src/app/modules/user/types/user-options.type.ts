import { Prisma } from '@prisma/client';

export type UserCreateOptions = Prisma.UsersCreateArgs;
export type UserFindFirstOptions = Prisma.UsersFindFirstOrThrowArgs;
export type UserFindManyOptions = Prisma.UsersFindManyArgs;
export type UserUpdateOptions = Prisma.UsersUpdateArgs;
export type UserDeleteOptions = Prisma.UsersDeleteArgs;
