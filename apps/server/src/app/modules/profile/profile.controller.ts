import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProfileParamDto } from './dtos/profile-param.dto';
import { ProfileDto } from './dtos/profile.dto';
import { IProfile } from './interfaces/profile.interface';
import { ProfileService } from './profile.service';

@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  async getProfiles(): Promise<IProfile[]> {
    return await this.profileService.getProfiles();
  }

  @Get(':id')
  async getProfile(@Param() { id }: ProfileParamDto): Promise<IProfile> {
    return await this.profileService.getProfile(id);
  }

  @Post()
  async createProfile(@Body() createProfileDto: ProfileDto): Promise<IProfile> {
    return await this.profileService.createProfile(createProfileDto);
  }

  @Put(':id')
  async updateProfile(
    @Param() { id }: ProfileParamDto,
    @Body() updateProfileDto: ProfileDto
  ): Promise<IProfile> {
    return await this.profileService.updateProfile(id, updateProfileDto);
  }

  @Delete(':id')
  async deleteProfile(@Param() { id }: ProfileParamDto): Promise<IProfile> {
    return await this.profileService.deleteProfile(id);
  }
}
