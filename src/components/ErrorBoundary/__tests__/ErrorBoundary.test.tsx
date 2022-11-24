import { render, screen } from '@testing-library/react';

import { ErrorBoundary } from '../ErrorBoundary';

const MockComponent = () => {
  throw new Error('Test');
};
const MockErrorBoundary = () => (
  <ErrorBoundary>
    <MockComponent />
  </ErrorBoundary>
);

describe('ErrorBoundary', () => {
  const original = window.location;

  beforeAll(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { reload: jest.fn() }
    });
  });

  afterAll(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: original
    });
  });

  it('it render error text', () => {
    render(<MockErrorBoundary />);

    const textElement = screen.getByRole('heading');

    expect(textElement).toBeInTheDocument();
  });

  it('it reload page', () => {
    render(<MockErrorBoundary />);

    const textElement = screen.getByRole('button');

    textElement.click();

    expect(window.location.reload).toBeCalledTimes(1);
  });
});
