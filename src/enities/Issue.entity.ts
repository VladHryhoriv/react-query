import {
  date,
  deserialize,
  identifier,
  list,
  object,
  primitive,
  serializable
} from 'serializr';

import { TIssueStatus } from '../types/Issues';
import { Label } from './Label.entity';
import { User } from './User.entity';

export class Issue {
  @serializable(identifier())
  id = '';

  @serializable
  title = '';

  @serializable
  number = 0;

  @serializable(object(User))
  assignee: User | null = null;

  @serializable
  commentCount = 0;

  @serializable(object(User))
  createdBy: User | null = null;

  @serializable(date())
  createdDate = new Date();

  @serializable(date())
  completedDate = new Date();

  @serializable(date())
  dueDate = new Date();

  @serializable(list(object(Label)))
  labels: Label[] = [];

  @serializable
  status: TIssueStatus = 'todo';

  @serializable(list(primitive()))
  comments: string[] = [];

  static deserialize(data: Object | string): Issue {
    return deserialize(Issue, data);
  }

  static deserializeAsArray(list: Issue[]): Issue[] {
    return list.map(Issue.deserialize);
  }
}
