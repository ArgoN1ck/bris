import { Injectable } from '@nestjs/common';
import { ProfileDto } from './dtos/profile.dto';
import { IProfile } from './interfaces/profile.interface';
import { ProfileRepository } from './profile.repository';
import {
  ProfileCreateOptions,
  ProfileDeleteOptions,
  ProfileFindFirstOptions,
  ProfileFindManyOptions,
  ProfileUpdateOptions,
} from './types/profile-options.type';

@Injectable()
export class ProfileService {
  constructor(private readonly profileRepository: ProfileRepository) {}

  async createProfile(options: ProfileCreateOptions): Promise<IProfile> {
    return this.profileRepository.create(options);
  }

  async getProfiles(options?: ProfileFindManyOptions): Promise<IProfile[]> {
    return this.profileRepository.findMany(options);
  }

  async getProfile(options: ProfileFindFirstOptions): Promise<IProfile> {
    return this.profileRepository.findOne(options);
  }

  async updateProfile(options: ProfileUpdateOptions): Promise<IProfile> {
    return this.profileRepository.update(options);
  }

  async deleteProfile(options: ProfileDeleteOptions): Promise<IProfile> {
    return this.profileRepository.delete(options);
  }
}
