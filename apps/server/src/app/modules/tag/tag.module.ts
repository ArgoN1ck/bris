import { Module } from '@nestjs/common';
import { TagController } from './tag.controller';
import { TagRepository } from './tag.repository';
import { TagService } from './tag.service';

@Module({
  providers: [TagService, TagRepository],
  controllers: [TagController],
  exports: [TagService],
})
export class TagModule {}
