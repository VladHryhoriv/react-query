import { FC } from 'react';

type Props = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  name: string;
  label?: string;
  placeholder?: string;
};

export const SingleForm: FC<Props> = ({
  onSubmit,
  label,
  name,
  placeholder
}) => {
  return (
    <form data-testid='single-form' onSubmit={onSubmit}>
      {label && <label htmlFor={name}>{label}</label>}
      <input type='search' placeholder={placeholder} id={name} name={name} />
    </form>
  );
};
