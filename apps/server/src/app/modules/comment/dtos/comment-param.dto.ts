import { BaseParamDto } from '../../../shared/dtos/base-param.dto';

export class CommentParamDto extends BaseParamDto {}

export class CommentArticleParamDto {
  id: string;
  slug: string;
}
