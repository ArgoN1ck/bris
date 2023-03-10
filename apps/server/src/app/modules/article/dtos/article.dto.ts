import { IArticle } from '../interfaces/article.interface';

export class ArticleDto
  implements Pick<IArticle, 'body' | 'title' | 'description'>
{
  body: string;
  title: string;
  description: string;
  authorId: string;
}
