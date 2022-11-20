import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { User } from 'enities/User.entity';
import { userKeys } from 'enums/queries';
import { fetchUser } from 'services/API/uesrAPI';

export const useUser = (
  id: User['id'],
  options?: Omit<UseQueryOptions<User, Error>, 'queruKey' | 'queryFn'>
): UseQueryResult<User, Error> => {
  const data = useQuery<User, Error>(
    userKeys.user(id),
    async () => {
      const user = await fetchUser(id);

      return User.deserialize(user);
    },
    { ...options }
  );

  return data;
};
