import { fireEvent, render, screen } from '@testing-library/react';

import { SingleForm } from '../SingleForm';

describe('SingleForm', () => {
  it('it render call submit function', () => {
    const fn = jest.fn();

    render(<SingleForm onSubmit={fn} name='test' />);

    const form = screen.getByTestId('single-form');

    fireEvent.submit(form);

    expect(fn).toBeCalledTimes(1);
  });

  it('it render correct label', () => {
    const fn = jest.fn();

    render(<SingleForm onSubmit={fn} name='test' label='Some Text' />);

    const label = screen.getByText(/some text/i);

    expect(label).toBeInTheDocument();
  });
});
