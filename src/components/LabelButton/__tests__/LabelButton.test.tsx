import { render, screen } from '@testing-library/react';
import { Label } from 'enities/Label.entity';

import { LabelButton } from '../LabelButton';

const label: Label = {
  id: '1',
  color: 'red',
  name: 'Bug'
};

describe('LabelButton', () => {
  it('it render button text', () => {
    const fn = jest.fn();
    render(<LabelButton onClick={fn} {...label} />);

    const button = screen.getByRole('button');
    expect(button.textContent).toBe(label.name);
  });

  it('it call onClick method', () => {
    const fn = jest.fn();
    render(<LabelButton onClick={fn} {...label} />);

    const button = screen.getByRole('button');
    button.click();
    expect(fn).toBeCalledTimes(1);
  });

  it('it set correct className if item is selected', () => {
    const fn = jest.fn();
    render(<LabelButton onClick={fn} isSelected {...label} />);

    const button = screen.getByRole('button');
    expect(button.classList.contains('selected')).toBe(true);
  });
});
