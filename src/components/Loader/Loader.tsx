import React, { FC } from 'react';
import { FaSpinner } from 'react-icons/fa';

export const Loader: FC = () => {
  return <FaSpinner role='img' arial-live='polite' className='loader' />;
};
