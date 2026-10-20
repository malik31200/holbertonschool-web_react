import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Header from './Header';
import authReducer from '../../features/auth/authSlice';

export const convertHexToRGBA = (hexCode) => {
  let hex = hexCode.replace('#', '');

  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return { r, g, b };
};

const renderWithRedux = (isLoggedIn = false) => {
  const store = configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState: {
      auth: {
        isLoggedIn,
        user: isLoggedIn
          ? { email: 'test@test.com', password: 'password123' }
          : { email: '', password: '' },
      },
    },
  });

  render(
    <Provider store={store}>
      <Header />
    </Provider>
  );

  return store;
};

test('should contain a heading and logo with the expected styles', () => {
  renderWithRedux();

  const headingElement = screen.getByRole('heading', {
    name: /school dashboard/i,
  });
  const imgElement = screen.getByAltText('holberton logo');

  expect(headingElement).toBeInTheDocument();
  expect(headingElement).toHaveStyle({
    color: convertHexToRGBA('#e1003c'),
  });
  expect(imgElement).toBeInTheDocument();
});

test('logout section is not rendered when the user is logged out', () => {
  renderWithRedux(false);

  expect(screen.queryByText(/logout/i)).not.toBeInTheDocument();
});

test('logout section is rendered when the user is logged in', () => {
  renderWithRedux(true);

  expect(screen.getByText(/logout/i)).toBeInTheDocument();
  expect(screen.getByText(/test@test.com/i)).toBeInTheDocument();
});

test('clicking logout dispatches the logout action', () => {
  const store = renderWithRedux(true);

  fireEvent.click(screen.getByText(/logout/i));

  expect(store.getState().auth.isLoggedIn).toBe(false);
});
