import { FC } from 'react';
import { ISSUE_STATUS } from 'enums/enums';

type Props = {
  onClick: (status: React.ChangeEvent<HTMLSelectElement>) => void;
  selected: string;
};

export const StatusList: FC<Props> = ({ onClick, selected }) => {
  return (
    <>
      <h3>Status</h3>
      <select value={selected} onChange={onClick} className='status-select'>
        <option value=''>Select status to fillter</option>
        {Object.keys(ISSUE_STATUS).map((option) => (
          <option value={option} key={option}>
            {ISSUE_STATUS[option as keyof typeof ISSUE_STATUS]}
          </option>
        ))}
      </select>
    </>
  );
};
