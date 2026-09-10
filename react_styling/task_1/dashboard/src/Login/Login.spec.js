import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';

test('Verify whether the login include 2 label, 2 inputs and 1 button', () => {
  render(<Login />);

  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  expect(screen.getAllByText(/email|password/i)).toHaveLength(2);
  expect(screen.getByRole('button', { name: /ok/i})).toBeInTheDocument();
});

test('checks that inputs get focused when their label are clicked', async() => {
  const user = userEvent.setup();
  render(<Login />);

  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);

  await user.click(screen.getByText(/email/i));
  expect(emailInput).toHaveFocus();

  await user.click(screen.getByText(/password/i));
  expect(passwordInput).toHaveFocus();
});
