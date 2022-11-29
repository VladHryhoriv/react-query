import { FC, useMemo } from 'react';
import { useField } from 'formik';

type InputProps = {
  name: string;
  className?: string;
  id: string;
  placeholder?: string;
};

export const Textarea: FC<InputProps> = ({
  name,
  className,
  id,
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
    <textarea
      {...field}
      id={id}
      className={classNames}
      data-testid='textarea'
      placeholder={placeholder}
    />
  );
};
