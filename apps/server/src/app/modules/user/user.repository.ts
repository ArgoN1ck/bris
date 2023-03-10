import { PrismaClientService } from '@bris/prisma/server';
import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { IUser } from './interfaces/user.interface';
import { IBaseRepository } from '../../shared/interfaces/base-repository.interface';
import {
  UserFindManyOptions,
  UserFindFirstOptions,
  UserCreateOptions,
  UserUpdateOptions,
  UserDeleteOptions,
} from './types/user-options.type';

@Injectable()
export class UserRepository implements IBaseRepository<IUser> {
  private readonly logger = new Logger(UserRepository.name);

  constructor(private readonly prismaClient: PrismaClientService) {}

  async findMany(options?: UserFindManyOptions): Promise<IUser[]> {
    return this.prismaClient.users.findMany(options);
  }

  async findOne(options: UserFindFirstOptions): Promise<IUser> {
    try {
      return await this.prismaClient.users.findFirstOrThrow(options);
    } catch (err) {
      this.logger.error(err, err.stack);
      if (err.code === 'P2025') {
        throw new NotFoundException({
          message: 'NOT_FOUND',
          description: `User not found`,
        });
      }
    }
  }

  async create(options: UserCreateOptions): Promise<IUser> {
    try {
      return await this.prismaClient.users.create(options);
    } catch (err) {
      this.logger.error(err, err.stack);

      if (err.code === 'P2002') {
        throw new ConflictException({
          message: 'CONFLICT',
          description: `User with this username or email already exists`,
        });
      }
    }
  }

  async update(options: UserUpdateOptions): Promise<IUser> {
    try {
      return await this.prismaClient.users.update(options);
    } catch (err) {
      this.logger.error(err, err.stack);

      if (err.code === 'P2025') {
        throw new NotFoundException({
          message: 'NOT_FOUND',
          description: `User not found`,
        });
      }

      if (err.code === 'P2002') {
        throw new ConflictException({
          message: 'CONFLICT',
          description: `User with this username or email already exists`,
        });
      }
    }
  }

  async delete(options: UserDeleteOptions): Promise<IUser> {
    try {
      return await this.prismaClient.users.delete(options);
    } catch (err) {
      this.logger.error(err, err.stack);
      if (err.code === 'P2025') {
        throw new NotFoundException({
          message: 'NOT_FOUND',
          description: `User not found`,
        });
      }
    }
  }
}
