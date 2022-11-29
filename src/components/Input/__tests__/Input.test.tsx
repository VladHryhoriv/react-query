import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import { Input } from '../Input';

const MockForm = (props: any) => {
  return (
    <Formik
      initialValues={{ test: '' }}
      validationSchema={Yup.object({ test: Yup.string().required() })}
      onSubmit={props.onSubmit}
    >
      <Form role='form'>
        <Input name='test' id='test' />
      </Form>
    </Formik>
  );
};

describe('Input', () => {
  it('it validate input', async () => {
    const submitFn = jest.fn();
    render(<MockForm onSubmit={submitFn} />);

    const form = screen.getByRole('form');
    const input = screen.getByRole('textbox');

    fireEvent.submit(form);

    await waitFor(() =>
      expect(input.classList.contains('input-error')).toBe(true)
    );
  });

  it('it have correct value', () => {
    const submitFn = jest.fn();
    render(<MockForm onSubmit={submitFn} />);

    const input = screen.getByRole('textbox');

    userEvent.type(input, 'mock');

    expect(input).toHaveValue('mock');
  });

  it('it call submit fn', async () => {
    const submitFn = jest.fn();
    render(<MockForm onSubmit={submitFn} />);

    const form = screen.getByRole('form');
    const input = screen.getByRole('textbox');

    userEvent.type(input, 'mock');
    fireEvent.submit(form);

    await waitFor(() =>
      expect(submitFn).toBeCalledWith({ test: 'mock' }, expect.anything())
    );
  });
});
