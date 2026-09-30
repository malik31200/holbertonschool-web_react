import { render, screen } from '@testing-library/react';
import Header from './Header';

const user = {
  isLoggedIn: false,
};

const logOut = jest.fn();

test('checks that the Header contains the Holberton Logo', () => {
  render(
    <Header
      user={user}
      logOut={logOut}
    />
  );

  expect(screen.getByAltText(/holberton logo/i)).toBeInTheDocument();
});

test('checks that the Header contains the correct heading', () => {
  render(
    <Header
      user={user}
      logOut={logOut}
    />
  );

  expect(
    screen.getByRole('heading', { name: /school dashboard/i })
  ).toBeInTheDocument();
});
