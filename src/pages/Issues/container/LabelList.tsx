import { FC } from 'react';
import { toast } from 'react-toastify';
import { LabelButton } from 'components/LabelButton';
import { Label } from 'enities/Label.entity';
import { useLabels } from 'hooks/Label/useLabels';

type Props = {
  onClick: (id: Label['id']) => void;
  selected: Label['id'][];
};

export const LabelList: FC<Props> = ({ onClick, selected }) => {
  const { data, isLoading, isError, error } = useLabels();

  if (isLoading) {
    return <p>Loading ...</p>;
  }

  if (isError || !data?.size) {
    toast.error(error?.message || 'Failed to load labels');
  }

  return (
    <div className='labels'>
      <h3>Labels</h3>
      <ul className='labels'>
        {Array.from(data?.values() || []).map((label) => (
          <LabelButton
            key={label.id}
            onClick={onClick}
            isSelected={selected.includes(label.id)}
            {...label}
          />
        ))}
      </ul>
    </div>
  );
};
