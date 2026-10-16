import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Login from './Login';
import authReducer from '../../features/auth/authSlice';

const renderWithRedux = (props = {}) => {
  const store = configureStore({
    reducer: {
      auth: authReducer,
    },
  });

  const utils = render(
    <Provider store={store}>
      <Login {...props} />
    </Provider>
  );

  return { ...utils, store };
};

test('testing signin form elements', () => {
  const { container } = renderWithRedux();

  const inputElements = container.querySelectorAll(
    'input[type="email"], input[type="text"], input[type="password"]'
  );

  expect(inputElements.length).toBeGreaterThanOrEqual(2);
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'OK' })).toBeInTheDocument();
});

test('email input is focused when its label is clicked', async () => {
  const user = userEvent.setup();
  renderWithRedux();

  const emailInput = screen.getByLabelText('Email');
  await user.click(screen.getByText('Email'));

  await waitFor(() => {
    expect(emailInput).toHaveFocus();
  });
});

test('password input is focused when its label is clicked', async () => {
  const user = userEvent.setup();
  renderWithRedux();

  const passwordInput = screen.getByLabelText('Password');
  await user.click(screen.getByText('Password'));

  await waitFor(() => {
    expect(passwordInput).toHaveFocus();
  });
});

test('submit button is disabled by default', () => {
  renderWithRedux({ isLoggedIn: false });

  expect(screen.getByRole('button', { name: 'OK' })).toBeDisabled();
});

test('submit button is enabled only with a valid email and password of at least 8 characters', () => {
  renderWithRedux({ isLoggedIn: false });

  const emailInput = screen.getByLabelText('Email');
  const passwordInput = screen.getByLabelText('Password');
  const submitButton = screen.getByRole('button', { name: 'OK' });

  expect(submitButton).toBeDisabled();

  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: '123' } });
  expect(submitButton).toBeDisabled();

  fireEvent.change(emailInput, { target: { value: 'test.com' } });
  fireEvent.change(passwordInput, { target: { value: '12345678' } });
  expect(submitButton).toBeDisabled();

  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: '12345678' } });
  expect(submitButton).not.toBeDisabled();
});

test('should dispatch login on form submission', () => {
  const { store } = renderWithRedux();

  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);

  fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });

  fireEvent.click(screen.getByRole('button', { name: /ok/i }));

  expect(store.getState().auth).toMatchObject({
    isLoggedIn: true,
    user: {
      email: 'test@test.com',
    },
  });
});
