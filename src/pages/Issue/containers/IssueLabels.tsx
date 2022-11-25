import { FC, useState } from 'react';
import { GoGear } from 'react-icons/go';
import { Issue } from 'enities/Issue.entity';
import { Label } from 'enities/Label.entity';
import { useLabels } from 'hooks/Label/useLabels';

type TProps = {
  onClick: (labels: Array<Label['id']>) => void;
  issueLabels: Issue['labels'];
};

export const IssueLabels: FC<TProps> = ({ onClick, issueLabels }) => {
  const { data: labels } = useLabels();
  const [open, setOpen] = useState<boolean>(false);

  const handleSelect = (label: Label['id']) => () => {
    setOpen(!open);
    const ids = issueLabels.map((lb) => lb.id);
    const labels = ids.includes(label);
    if (labels) {
      onClick(ids.filter((lb) => lb !== label));
    } else {
      onClick([...ids, label]);
    }
  };

  const renderLabels = () => {
    if (!issueLabels) {
      return <div>No labels</div>;
    }

    return issueLabels.map((label) => (
      <span key={label.id} className={`label ${label.color}`}>
        {label.name}
      </span>
    ));
  };

  return (
    <div className='issue-options'>
      <div>
        <span>Labels</span>
        {renderLabels()}
      </div>
      <GoGear onClick={() => setOpen(!open)} />
      {open && labels?.size && (
        <div className='picker-menu labels'>
          {Array.from(labels?.values() || []).map((label) => {
            const selected = issueLabels.find((lb) => lb.id === label.id);
            return (
              <div
                key={label.id}
                className={selected ? 'selected' : ''}
                onClick={handleSelect(label.id)}
              >
                <span
                  className='label-dot'
                  style={{ backgroundColor: label.color }}
                ></span>
                {label.name}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
