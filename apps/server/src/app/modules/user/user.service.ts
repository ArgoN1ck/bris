import { Injectable } from '@nestjs/common';
import { IUser } from './interfaces/user.interface';
import {
  UserCreateOptions,
  UserFindManyOptions,
  UserFindFirstOptions,
  UserUpdateOptions,
  UserDeleteOptions,
} from './types/user-options.type';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(options: UserCreateOptions): Promise<IUser> {
    return this.userRepository.create(options);
  }

  async getUsers(options?: UserFindManyOptions): Promise<IUser[]> {
    return this.userRepository.findMany(options);
  }

  async getUser(options: UserFindFirstOptions): Promise<IUser> {
    return this.userRepository.findOne(options);
  }

  async updateUser(options: UserUpdateOptions): Promise<IUser> {
    return this.userRepository.update(options);
  }

  async deleteUser(options: UserDeleteOptions): Promise<IUser> {
    return this.userRepository.delete(options);
  }
}
