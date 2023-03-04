import { IProfile } from '../interfaces/profile.interface';

export class ProfileDto
  implements
    Omit<
      IProfile,
      'id' | 'bio' | 'image' | 'createdAt' | 'updatedAt' | 'deletedAt'
    >
{
  userId: string;
  image?: string;
  bio?: string;
}
