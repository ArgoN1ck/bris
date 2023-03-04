import { PrismaClientService } from '@bris/prisma/server';
import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { IBaseRepository } from '../../shared/interfaces/base-repository.interface';
import { TagDto } from './dtos/tag.dto';
import { ITag } from './interfaces/tag.interface';
@Injectable()
export class TagRepository implements IBaseRepository<ITag> {
  private readonly logger = new Logger(TagRepository.name);

  constructor(private readonly prismaClient: PrismaClientService) {}

  async findMany(): Promise<ITag[]> {
    return this.prismaClient.tags.findMany();
  }

  async findOne(id: string): Promise<ITag> {
    try {
      return await this.prismaClient.tags.findFirstOrThrow({
        where: {
          id,
        },
      });
    } catch (err) {
      this.logger.error(err, err.stack);
      if (err.code === 'P2025') {
        throw new NotFoundException({
          message: 'NOT_FOUND',
          description: `Tag with id: ${id} not found`,
        });
      }
    }
  }

  async create(createTagDto: TagDto): Promise<ITag> {
    try {
      return await this.prismaClient.tags.create({
        data: { ...createTagDto },
      });
    } catch (err) {
      this.logger.error(err, err.stack);

      if (err.code === 'P2002') {
        throw new ConflictException({
          message: 'CONFLICT',
          description: `Tag with this title already exists`,
        });
      }
    }
  }

  async update(id: string, updateTagDto: TagDto): Promise<ITag> {
    try {
      return await this.prismaClient.tags.update({
        data: { ...updateTagDto },
        where: { id },
      });
    } catch (err) {
      this.logger.error(err, err.stack);

      if (err.code === 'P2025') {
        throw new NotFoundException({
          message: 'NOT_FOUND',
          description: `Tag with id: ${id} not found`,
        });
      }

      if (err.code === 'P2002') {
        throw new ConflictException({
          message: 'CONFLICT',
          description: `Tag with this tagname or email already exists`,
        });
      }
    }
  }

  async delete(id: string): Promise<ITag> {
    try {
      return await this.prismaClient.tags.delete({ where: { id } });
    } catch (err) {
      this.logger.error(err, err.stack);
      if (err.code === 'P2025') {
        throw new NotFoundException({
          message: 'NOT_FOUND',
          description: `Tag with id: ${id} not found`,
        });
      }
    }
  }
}
