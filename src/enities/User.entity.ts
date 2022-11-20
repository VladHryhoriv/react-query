import { deserialize, identifier, serializable } from 'serializr';

export class User {
  @serializable(identifier())
  id = '';

  @serializable
  name = '';

  @serializable
  profilePictureUrl = '';

  static deserialize(data: Object | string): User {
    return deserialize(User, data);
  }

  static deserializeAsMap(list: User[]): Map<User['name'], User> {
    return list.reduce((acc, label) => {
      acc.set(label.id, User.deserialize(label));

      return acc;
    }, new Map());
  }
}
