import { render, screen } from '@testing-library/react';
import Footer from './Footer';

test('renders the correct copyright text', () => {
  render(<Footer />);

  const currentYear = new Date().getFullYear();

  expect(screen.getByText(
    `Copyright ${currentYear} - Holberton School`
  )).toBeInTheDocument();
});
