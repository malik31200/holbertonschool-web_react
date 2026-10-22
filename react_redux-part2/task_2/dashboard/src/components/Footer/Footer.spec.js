import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Footer from './Footer';
import { getCurrentYear, getFooterCopy } from '../../utils/utils';

const renderWithRedux = (isLoggedIn = false) => {
  const store = configureStore({
    reducer: {
      auth: (state = { isLoggedIn: false }) => state,
    },
    preloadedState: {
      auth: {
        isLoggedIn,
        user: {
          email: 'test@test.com',
          password: 'password123',
        },
      },
    },
  });

  return render(
    <Provider store={store}>
      <Footer />
    </Provider>
  );
};

test('It should render footer with copyright text', () => {
  renderWithRedux();

  const footerParagraph = screen.getByText(/copyright/i);

  expect(footerParagraph).toHaveTextContent(
    new RegExp(`copyright ${(new Date()).getFullYear()}`, 'i')
  );
  expect(footerParagraph).toHaveTextContent(/holberton school/i);
});

test('Contact us link is not displayed when user is logged out', () => {
  renderWithRedux(false);

  const contactLink = screen.queryByText(/contact us/i);
  expect(contactLink).not.toBeInTheDocument();
});

test('Contact us link is displayed when user is logged in', () => {
  renderWithRedux(true);

  const contactLink = screen.getByText(/contact us/i);
  expect(contactLink).toBeInTheDocument();
});
