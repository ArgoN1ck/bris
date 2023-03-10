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

  @Get(':username')
  async getProfile(@Param() { username }: ProfileParamDto): Promise<IProfile> {
    return await this.profileService.getProfile({
      where: {
        Users: { username },
      },
    });
  }

  @Post()
  async createProfile(@Body() createProfileDto: ProfileDto): Promise<IProfile> {
    return await this.profileService.createProfile({
      data: createProfileDto,
    });
  }

  @Put(':id')
  async updateProfile(
    @Param() { id }: ProfileParamDto,
    @Body() updateProfileDto: ProfileDto
  ): Promise<IProfile> {
    return await this.profileService.updateProfile({
      where: { id },
      data: updateProfileDto,
    });
  }

  @Delete(':id')
  async deleteProfile(@Param() { id }: ProfileParamDto): Promise<IProfile> {
    return await this.profileService.deleteProfile({ where: { id } });
  }
}
