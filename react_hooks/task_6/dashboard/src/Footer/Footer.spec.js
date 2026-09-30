import { render, screen } from '@testing-library/react';
import Footer from './Footer';

test('renders the correct copyright text', () => {
  render(
    <Footer
      user={{
        isLoggedIn: false,
      }}
    />
  );

  const currentYear = new Date().getFullYear();

  expect(
    screen.getByText(`Copyright ${currentYear} - Holberton School`)
  ).toBeInTheDocument();
});

test('does not display Contact us when user is logged out', () => {
  render(
    <Footer
      user={{
        isLoggedIn: false,
      }}
    />
  );

  expect(screen.queryByText('Contact us')).toBeNull();
});

test('display Contact us when user is logged in', () => {
  render(
    <Footer
      user={{
        isLoggedIn: true,
      }}
    />
  );

  expect(screen.getByText('Contact us')).toBeInTheDocument();
});
