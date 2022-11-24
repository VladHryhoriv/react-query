import { FC } from 'react';
import { Label } from 'enities/Label.entity';

type Props = {
  onClick: (id: Label['id']) => void;
  isSelected?: boolean;
} & Label;

export const LabelButton: FC<Props> = ({
  onClick,
  isSelected,
  id,
  color,
  name
}) => {
  return (
    <li>
      <button
        onClick={() => onClick(id)}
        className={`${isSelected ? 'selected' : ''} label ${color}`}
      >
        {name}
      </button>
    </li>
  );
};
