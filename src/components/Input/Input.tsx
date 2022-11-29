import { FC, useMemo } from 'react';
import { useField } from 'formik';

type InputProps = {
  name: string;
  className?: string;
  id: string;
  type?: string;
  placeholder?: string;
};

export const Input: FC<InputProps> = ({
  name,
  className,
  id,
  type = 'text',
  placeholder
}) => {
  const [field, meta] = useField(name);

  const classNames = useMemo(() => {
    if (meta.error && meta.touched) {
      return className + ' input-error';
    }

    return className;
  }, [meta, className]);

  return (
    <input
      {...field}
      id={id}
      className={classNames}
      data-testid='input'
      type={type}
      placeholder={placeholder}
    />
  );
};
