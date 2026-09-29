import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import newContext from '../Context/context';

test('renders the correct copyright text', () => {
  render(<Footer />);

  const currentYear = new Date().getFullYear();

  expect(screen.getByText(
    `Copyright ${currentYear} - Holberton School`
  )).toBeInTheDocument();
});

test('does not display Contact us when user is logged out', () => {
  render(
    <newContext.Provider
      value={{
        user: {
          isLoggedIn: false
        }
      }}
    >
      <Footer />
    </newContext.Provider>
  );

   expect(screen.queryByText('Contact us')).toBeNull();
});

test('display Contact us when user is logged in', () => {
  render(
    <newContext.Provider
      value={{
        user: {
          isLoggedIn: true
        }
      }}
    >
      <Footer />
    </newContext.Provider>
  );

   expect(screen.getByText('Contact us')).toBeInTheDocument();
});
