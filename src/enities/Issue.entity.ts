import {
  date,
  deserialize,
  identifier,
  list,
  primitive,
  serializable
} from 'serializr';

export class Issue {
  @serializable(identifier())
  id = '';

  @serializable
  title = '';

  @serializable
  number = 0;

  @serializable(identifier())
  assignee = '';

  @serializable
  commentCount = 0;

  @serializable(identifier())
  createdBy = '';

  @serializable(date())
  createdDate = new Date();

  @serializable(date())
  completedDate = new Date();

  @serializable(date())
  dueDate = new Date();

  @serializable(list(primitive()))
  labels: string[] = [];

  @serializable
  status = '';

  @serializable(list(primitive()))
  comments: string[] = [];

  static deserialize(data: Object | string): Issue {
    console.log('type', typeof data);
    return deserialize(Issue, data);
  }

  static deserializeAsArray(list: Issue[]): Issue[] {
    return list.map(Issue.deserialize);
  }
}
