import { PrismaClientService } from '@bris/prisma/server';
import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { IBaseRepository } from '../../shared/interfaces/base-repository.interface';
import { ProfileDto } from './dtos/profile.dto';
import { IProfile } from './interfaces/profile.interface';
@Injectable()
export class ProfileRepository implements IBaseRepository<IProfile> {
  private readonly logger = new Logger(ProfileRepository.name);

  constructor(private readonly prismaClient: PrismaClientService) {}

  async findMany(): Promise<IProfile[]> {
    return this.prismaClient.profiles.findMany();
  }

  async findOne(id: string): Promise<IProfile> {
    try {
      return await this.prismaClient.profiles.findFirstOrThrow({
        where: {
          id,
        },
      });
    } catch (err) {
      this.logger.error(err, err.stack);
      if (err.code === 'P2025') {
        throw new NotFoundException({
          message: 'NOT_FOUND',
          description: `Profile with id: ${id} not found`,
        });
      }
    }
  }

  async create(createProfileDto: ProfileDto): Promise<IProfile> {
    try {
      return await this.prismaClient.profiles.create({
        data: { ...createProfileDto },
      });
    } catch (err) {
      this.logger.error(err, err.stack);

      if (err.code === 'P2002') {
        throw new ConflictException({
          message: 'CONFLICT',
          description: `Profile with this title already exists`,
        });
      }
    }
  }

  async update(id: string, updateProfileDto: ProfileDto): Promise<IProfile> {
    try {
      return await this.prismaClient.profiles.update({
        data: { ...updateProfileDto },
        where: { id },
      });
    } catch (err) {
      this.logger.error(err, err.stack);

      if (err.code === 'P2025') {
        throw new NotFoundException({
          message: 'NOT_FOUND',
          description: `Profile with id: ${id} not found`,
        });
      }

      if (err.code === 'P2002') {
        throw new ConflictException({
          message: 'CONFLICT',
          description: `Profile with this profilename or email already exists`,
        });
      }
    }
  }

  async delete(id: string): Promise<IProfile> {
    try {
      return await this.prismaClient.profiles.delete({ where: { id } });
    } catch (err) {
      this.logger.error(err, err.stack);
      if (err.code === 'P2025') {
        throw new NotFoundException({
          message: 'NOT_FOUND',
          description: `Profile with id: ${id} not found`,
        });
      }
    }
  }
}
