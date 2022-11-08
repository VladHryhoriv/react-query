import { FC } from 'react';
import { Issue } from 'enities/Issue.entity';

type Props = {} & Issue;

export const IssueListItem: FC<Props> = (props) => {
  const { title } = props;

  return <li>{title}</li>;
};
