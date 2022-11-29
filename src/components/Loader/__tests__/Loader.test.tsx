import { render, screen } from '@testing-library/react';

import { Loader } from '../Loader';

describe('Loader', () => {
  it('it renders without error', () => {
    expect(<Loader />).toBeTruthy();
  });

  it('it render loader', () => {
    render(<Loader />);

    const loader = screen.getByRole('img');

    expect(loader).toBeInTheDocument();
  });
});
