import { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IssueComment } from 'components/IssueComment';
import { IssueHeader } from 'components/IssueHeader';
import { Loader } from 'components/Loader';
import { paths } from 'config/paths';
import { defaultToasOptions } from 'config/toast/index.ts';
import { issueKeys } from 'enums/queries';
import { useInfiniteIssueComments } from 'hooks/Comments/useInfiniteIssueComments';
import { useIssue } from 'hooks/Issues/useIssue';
import { useInfinityAction } from 'hooks/useInfinityAction';

type TParams = {
  id: string;
};

export const IssuePage: FC = () => {
  const params = useParams<TParams>();
  const navigate = useNavigate();

  const { data, isLoading, isError, error, status } = useIssue(
    Number(params.id)
  );

  const comments = useInfiniteIssueComments(
    issueKeys.comments(Number(params.id), 1),
    {
      enabled: status === 'success'
    }
  );

  const fetchNextPage = () => {
    if (comments.isFetchingNextPage) {
      return;
    }

    comments.fetchNextPage();
  };

  useInfinityAction(document, fetchNextPage, 100);

  if (isError) {
    toast.error(error?.message || 'Issue not found !', {
      ...defaultToasOptions,
      toastId: 'issue-error'
    });
    navigate(paths.issues());
    return null;
  }

  return (
    <div className='issue-details'>
      {isLoading || !data ? <p>Loading ...</p> : <IssueHeader {...data} />}
      <main>
        <section>
          {comments.data?.pages.length &&
            comments.data.pages.map((page) =>
              page.map((comment) => (
                <IssueComment key={comment.id} {...comment} />
              ))
            )}
          {comments.isFetchingNextPage && <Loader />}
        </section>
        {/* <aside>
          {!!issueDetails.data && (
            <IssueStatus
              status={issueDetails.data.status}
              issueNumber={issueDetails.data.number.toString()}
            />
          )}
          {!!issueDetails.data && (
            <IssueAssignment
              assignee={issueDetails.data.assignee}
              issueNumber={issueDetails.data.number.toString()}
            />
          )}
          {!!issueDetails.data && (
            <IssueLabels
              labels={issueDetails.data.labels}
              issueNumber={issueDetails.data.number.toString()}
            />
          )}
        </aside> */}
      </main>
    </div>
  );
};