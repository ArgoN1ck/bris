import { Injectable } from '@nestjs/common';
import { ProfileDto } from './dtos/profile.dto';
import { IProfile } from './interfaces/profile.interface';
import { ProfileRepository } from './profile.repository';

@Injectable()
export class ProfileService {
  constructor(private readonly profileRepository: ProfileRepository) {}

  async createProfile(createProfileDto: ProfileDto): Promise<IProfile> {
    return this.profileRepository.create(createProfileDto);
  }

  async getProfiles(): Promise<IProfile[]> {
    return this.profileRepository.findMany();
  }

  async getProfile(id: string): Promise<IProfile> {
    return this.profileRepository.findOne(id);
  }

  async updateProfile(
    id: string,
    updateProfileDto: ProfileDto
  ): Promise<IProfile> {
    return this.profileRepository.update(id, updateProfileDto);
  }

  async deleteProfile(id: string): Promise<IProfile> {
    return this.profileRepository.delete(id);
  }
}
