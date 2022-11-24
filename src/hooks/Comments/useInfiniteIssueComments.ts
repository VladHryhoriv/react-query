import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult
} from 'react-query';
import { Comment } from 'enities/Comment.entity';
import { User } from 'enities/User.entity';
import { issueKeys, userKeys } from 'enums/queries';
import { fetchIssueComments } from 'services/API';
import { queryClient } from 'utils/queryClient';

export type IssueCommentsKeys = ReturnType<typeof issueKeys['comments']>;

export const useInfiniteIssueComments = (
  queryKeys: IssueCommentsKeys,
  options?: Omit<
    UseInfiniteQueryOptions<
      Comment[],
      Error,
      Comment[],
      Comment[],
      IssueCommentsKeys
    >,
    'queryKey' | 'queryFn'
  >
): UseInfiniteQueryResult<Comment[], Error> => {
  const data = useInfiniteQuery<Comment[], Error, Comment[], IssueCommentsKeys>(
    queryKeys,
    async ({ pageParam = 1, queryKey }) => {
      const commentsData = await fetchIssueComments({
        number: queryKey[0].number,
        page: pageParam
      });

      const users = queryClient.getQueryData<
        ReturnType<typeof User.deserializeAsMap>
      >(userKeys.root);

      const comments = Comment.deserializeAsArray(
        commentsData.map((comment) => ({
          ...comment,
          createdBy: users?.get(comment.createdBy) as User
        }))
      );

      return comments;
    },
    {
      retry: 1,
      getNextPageParam: (_lastPage, pages) => {
        if (pages.length === 0) return;
        return pages.length + 1;
      },
      ...options
    }
  );

  return data;
};
