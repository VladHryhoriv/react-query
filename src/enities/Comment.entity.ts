import {
  date,
  deserialize,
  identifier,
  primitive,
  serializable
} from 'serializr';

export class Comment {
  @serializable(identifier())
  id = '';

  @serializable(identifier())
  createdBy = '';

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
