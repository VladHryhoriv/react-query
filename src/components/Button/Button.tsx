import { FC } from 'react';

type Props = {
  children?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<Props> = ({ children, ...props }) => {
  return <button {...props}>{children}</button>;
};
