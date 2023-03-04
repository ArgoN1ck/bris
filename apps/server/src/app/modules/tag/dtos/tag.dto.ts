import { ITag } from '../interfaces/tag.interface';

export class TagDto
  implements Omit<ITag, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>
{
  title: string;
}
