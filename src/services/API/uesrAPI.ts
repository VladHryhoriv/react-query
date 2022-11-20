import { User } from 'enities/User.entity';
import { api } from 'utils/APIHandler';

export const fetchUser = (id: User['id']): Promise<User> => {
  return api<User>(`/api/users/${id}`);
};

export const fetchAllUsers = (): Promise<User[]> => {
  return api<User[]>(`/api/users`);
};
