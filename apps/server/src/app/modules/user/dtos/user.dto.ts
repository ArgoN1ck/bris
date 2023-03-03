import { IUser } from '../interfaces/user.interface';

export class UserDto
  implements Omit<IUser, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>
{
  password: string;
  username: string;
  email: string;
}
