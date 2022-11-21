import { render, screen } from '@testing-library/react';

import { Button } from '../Button';

describe('Button', () => {
  it('it renders without error', () => {
    expect(<Button />).toBeTruthy();
  });

  it('it render button content', () => {
    render(
      <Button>
        <span>Test text</span>
      </Button>
    );

    const child = screen.getByText(/test text/i);

    expect(child).toBeInTheDocument();
  });
});
