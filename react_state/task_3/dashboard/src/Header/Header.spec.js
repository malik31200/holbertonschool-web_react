import { render, screen } from '@testing-library/react';
import Header from './Header';

test('checks that the Header contains the Holberton Logo', () => {
  render(<Header />);

  expect(screen.getByAltText(/holberton logo/i)).toBeInTheDocument();
});

test('checks that the Header contains the correct heading', () => {
  render(<Header />);

  expect(screen.getByRole('heading', { name: /school dashboard/i})).toBeInTheDocument();
});

test('does not display logout section when user is logged out', () => {
  render(<Header />);

  expect(screen.queryByText(/logout/i)).not.toBeInTheDocument();
});
