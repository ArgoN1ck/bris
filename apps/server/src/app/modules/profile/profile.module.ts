import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileRepository } from './profile.repository';
import { ProfileService } from './profile.service';

@Module({
  providers: [ProfileService, ProfileRepository],
  controllers: [ProfileController],
  exports: [ProfileService],
})
export class ProfileModule {}
