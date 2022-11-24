import {
  date,
  deserialize,
  identifier,
  object,
  primitive,
  serializable
} from 'serializr';

import { User } from './User.entity';

export class Comment {
  @serializable(identifier())
  id = '';

  @serializable(object(User))
  createdBy: User | null = null;

  @serializable(date())
  createdDate = new Date();

  @serializable(primitive())
  comment = '';

  static deserialize(data: Object | string): Comment {
    return deserialize(Comment, data);
  }

  static deserializeAsArray(list: Comment[]): Comment[] {
    return list.map(Comment.deserialize);
  }
}
