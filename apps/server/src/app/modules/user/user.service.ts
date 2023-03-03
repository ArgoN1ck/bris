import { Injectable } from '@nestjs/common';
import { UserDto } from './dtos/user.dto';
import { IUser } from './interfaces/user.interface';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(createUserDto: UserDto): Promise<IUser> {
    return this.userRepository.create(createUserDto);
  }

  async getUsers(): Promise<IUser[]> {
    return this.userRepository.findMany();
  }

  async getUser(id: string): Promise<IUser> {
    return this.userRepository.findOne(id);
  }

  async updateUser(id: string, updateUserDto: UserDto): Promise<IUser> {
    return this.userRepository.update(id, updateUserDto);
  }

  async deleteUser(id: string): Promise<IUser> {
    return this.userRepository.delete(id);
  }
}
