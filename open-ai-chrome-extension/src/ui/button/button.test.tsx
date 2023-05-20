import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './button';

describe('Button', () => {
  test('renders the button with the provided text', () => {
    render(<Button onClick={() => {}}>Test Button</Button>);
    const buttonElement = screen.getByText(/test button/i);
    expect(buttonElement).toBeInTheDocument();
  });

  test('calls onClick prop when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    fireEvent.click(screen.getByText(/click me/i));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('has the correct className based on the provided state', () => {
    const { rerender } = render(
      <Button onClick={() => {}} state="none">
        Test Button
      </Button>
    );
    let buttonElement = screen.getByText(/test button/i);
    expect(buttonElement.className).not.toContain('active');

    rerender(
      <Button onClick={() => {}} state="active">
        Test Button
      </Button>
    );
    buttonElement = screen.getByText(/test button/i);
    expect(buttonElement.className).toContain('active');
  });
});
