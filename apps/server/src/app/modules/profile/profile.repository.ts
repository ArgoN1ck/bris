import { PrismaClientService } from '@bris/prisma/server';
import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { IBaseRepository } from '../../shared/interfaces/base-repository.interface';
import { IProfile } from './interfaces/profile.interface';
import {
  ProfileCreateOptions,
  ProfileDeleteOptions,
  ProfileFindFirstOptions,
  ProfileFindManyOptions,
  ProfileUpdateOptions,
} from './types/profile-options.type';
@Injectable()
export class ProfileRepository implements IBaseRepository<IProfile> {
  private readonly logger = new Logger(ProfileRepository.name);

  constructor(private readonly prismaClient: PrismaClientService) {}

  async findMany(options?: ProfileFindManyOptions): Promise<IProfile[]> {
    return this.prismaClient.profiles.findMany(options);
  }

  async findOne(options: ProfileFindFirstOptions): Promise<IProfile> {
    try {
      return await this.prismaClient.profiles.findFirstOrThrow(options);
    } catch (err) {
      this.logger.error(err, err.stack);
      if (err.code === 'P2025') {
        throw new NotFoundException({
          message: 'NOT_FOUND',
          description: `Profile not found`,
        });
      }
    }
  }

  async create(options: ProfileCreateOptions): Promise<IProfile> {
    try {
      return await this.prismaClient.profiles.create(options);
    } catch (err) {
      this.logger.error(err, err.stack);

      if (err.code === 'P2002') {
        throw new ConflictException({
          message: 'CONFLICT',
          description: `Profile with for this user already exists`,
        });
      }
    }
  }

  async update(options: ProfileUpdateOptions): Promise<IProfile> {
    try {
      return await this.prismaClient.profiles.update(options);
    } catch (err) {
      this.logger.error(err, err.stack);

      if (err.code === 'P2025') {
        throw new NotFoundException({
          message: 'NOT_FOUND',
          description: `Profile not found`,
        });
      }

      if (err.code === 'P2002') {
        throw new ConflictException({
          message: 'CONFLICT',
          description: `Profile for this user already exists`,
        });
      }
    }
  }

  async delete(options: ProfileDeleteOptions): Promise<IProfile> {
    try {
      return await this.prismaClient.profiles.delete(options);
    } catch (err) {
      this.logger.error(err, err.stack);
      if (err.code === 'P2025') {
        throw new NotFoundException({
          message: 'NOT_FOUND',
          description: `Profile not found`,
        });
      }
    }
  }
}
