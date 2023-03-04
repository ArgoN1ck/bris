import { Injectable } from '@nestjs/common';
import { TagDto } from './dtos/tag.dto';
import { ITag } from './interfaces/tag.interface';
import { TagRepository } from './tag.repository';

@Injectable()
export class TagService {
  constructor(private readonly tagRepository: TagRepository) {}

  async createTag(createTagDto: TagDto): Promise<ITag> {
    return this.tagRepository.create(createTagDto);
  }

  async getTags(): Promise<ITag[]> {
    return this.tagRepository.findMany();
  }

  async getTag(id: string): Promise<ITag> {
    return this.tagRepository.findOne(id);
  }

  async updateTag(id: string, updateTagDto: TagDto): Promise<ITag> {
    return this.tagRepository.update(id, updateTagDto);
  }

  async deleteTag(id: string): Promise<ITag> {
    return this.tagRepository.delete(id);
  }
}
