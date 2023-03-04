import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TagParamDto } from './dtos/tag-param.dto';
import { TagDto } from './dtos/tag.dto';
import { ITag } from './interfaces/tag.interface';
import { TagService } from './tag.service';

@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  async getTags(): Promise<ITag[]> {
    return await this.tagService.getTags();
  }

  @Get(':id')
  async getTag(@Param() { id }: TagParamDto): Promise<ITag> {
    return await this.tagService.getTag(id);
  }

  @Post()
  async createTag(@Body() createTagDto: TagDto): Promise<ITag> {
    return await this.tagService.createTag(createTagDto);
  }

  @Put(':id')
  async updateTag(
    @Param() { id }: TagParamDto,
    @Body() updateTagDto: TagDto
  ): Promise<ITag> {
    return await this.tagService.updateTag(id, updateTagDto);
  }

  @Delete(':id')
  async deleteTag(@Param() { id }: TagParamDto): Promise<ITag> {
    return await this.tagService.deleteTag(id);
  }
}
