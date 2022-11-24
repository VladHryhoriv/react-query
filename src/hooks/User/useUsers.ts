import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { User } from 'enities/User.entity';
import { userKeys } from 'enums/queries';
import { fetchAllUsers } from 'services/API/uesrAPI';

export const useUsers = (
  options?: Omit<
    UseQueryOptions<Map<User['id'], User>, Error>,
    'queruKey' | 'queryFn'
  >
): UseQueryResult<Map<User['id'], User>, Error> => {
  const data = useQuery<Map<User['id'], User>, Error>(
    userKeys.root,
    async () => {
      const user = await fetchAllUsers();

      return User.deserializeAsMap(user);
    },
    { retry: 1, ...options }
  );

  return data;
};
