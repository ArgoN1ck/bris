import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserParamDto } from './dtos/user-param.dto';
import { UserDto } from './dtos/user.dto';
import { IUser } from './interfaces/user.interface';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(): Promise<IUser[]> {
    return await this.userService.getUsers();
  }

  @Get(':id')
  async getUser(@Param() { id }: UserParamDto): Promise<IUser> {
    return await this.userService.getUser(id);
  }

  @Post()
  async createUser(@Body() createUserDto: UserDto): Promise<IUser> {
    return await this.userService.createUser(createUserDto);
  }

  @Put(':id')
  async updateUser(
    @Param() { id }: UserParamDto,
    @Body() updateUserDto: UserDto
  ): Promise<IUser> {
    return await this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param() { id }: UserParamDto): Promise<IUser> {
    return await this.userService.deleteUser(id);
  }
}
