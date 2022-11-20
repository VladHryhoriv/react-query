import { useInfiniteQuery } from 'react-query';
import { Comment } from 'enities/Comment.entity';
import { issueKeys } from 'enums/queries';
import { fetchIssueComments } from 'services/API';

export type IssueCommentsKeys = ReturnType<typeof issueKeys['comments']>;

export const useInfiniteIssueComments = (queryKeys: IssueCommentsKeys) => {
  const data = useInfiniteQuery<Comment[], Error, Comment[], IssueCommentsKeys>(
    queryKeys,
    async ({ pageParam, queryKey }) => {
      const data = await fetchIssueComments({
        number: queryKey[0].number,
        page: pageParam?.page
      });

      const comments = Comment.deserializeAsArray(data);

      return comments;
    },
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.length === 0) return;
        return lastPage.length + 1;
      }
    }
  );

  return data;
};
