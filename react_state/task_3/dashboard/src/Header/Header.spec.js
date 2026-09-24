import { fireEvent, render, screen } from '@testing-library/react';
import Header from './Header';
import newContext from '../Context/context';

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

test('displays logout section when user is logged in', () => {
  render(
    <newContext.Provider
      value={{
        user: {
          email: 'test@example.com',
          password: '12345678',
          isLoggedIn: true,
        },
        logOut: jest.fn(),
      }}
    >
      <Header />
    </newContext.Provider>
  );

  expect(screen.getByText(/Welcome test@example.com/i)).toBeInTheDocument();
  expect(screen.getByText(/logout/i)).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /logout/i })).toBeInTheDocument();
});

test('calls logOut when logout link is clicked', () => {
  const logOut = jest.fn();

  render(
    <newContext.Provider
      value={{
        user: {
          email: 'test@example.com',
          password: '12345678',
          isLoggedIn: true,
        },
        logOut,
      }}
    >
      <Header />
    </newContext.Provider>
  );

  fireEvent.click(screen.getByRole('link', { name: /logout/i }));

  expect(logOut).toHaveBeenCalled();
});
