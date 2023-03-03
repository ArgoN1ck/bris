import { PrismaClientService } from '@bris/prisma/server';
import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { IUser } from './interfaces/user.interface';
import { IBaseRepository } from '../../shared/interfaces/base-repository.interface';
import { UserDto } from './dtos/user.dto';

@Injectable()
export class UserRepository implements IBaseRepository<IUser> {
  private readonly logger = new Logger(UserRepository.name);

  constructor(private readonly prismaClient: PrismaClientService) {}

  async findMany(): Promise<IUser[]> {
    return this.prismaClient.users.findMany();
  }

  async findOne(id: string): Promise<IUser> {
    try {
      return await this.prismaClient.users.findFirstOrThrow({
        where: {
          id,
        },
      });
    } catch (err) {
      this.logger.error(err, err.stack);
      if (err.code === 'P2025') {
        throw new NotFoundException({
          message: 'NOT_FOUND',
          description: `User with id: ${id} not found`,
        });
      }
    }
  }

  async create(createUserDto: UserDto): Promise<IUser> {
    try {
      return await this.prismaClient.users.create({
        data: { ...createUserDto },
      });
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

  async update(id: string, updateUserDto: UserDto): Promise<IUser> {
    try {
      return await this.prismaClient.users.update({
        data: { ...updateUserDto },
        where: { id },
      });
    } catch (err) {
      this.logger.error(err, err.stack);

      if (err.code === 'P2025') {
        throw new NotFoundException({
          message: 'NOT_FOUND',
          description: `User with id: ${id} not found`,
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

  async delete(id: string): Promise<IUser> {
    try {
      return await this.prismaClient.users.delete({ where: { id } });
    } catch (err) {
      this.logger.error(err, err.stack);
      if (err.code === 'P2025') {
        throw new NotFoundException({
          message: 'NOT_FOUND',
          description: `User with id: ${id} not found`,
        });
      }
    }
  }
}
