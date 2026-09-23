import { fireEvent, render, screen } from '@testing-library/react';
import App from './App.jsx';

test('renders 2 input elements', () => {
  render(<App />);

  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
});

test('renders Email and Password label', () => {
  render(<App />);

  expect(
    screen.getByText(/email/i, { selector: 'label' })
  ).toBeInTheDocument();

  expect(
    screen.getByText(/password/i, { selector: 'label' })
  ).toBeInTheDocument();
});

test('renders OK button', () => {
  render(<App />);

  expect(
    screen.getByRole('button', { name: /ok/i })
  ).toBeInTheDocument();
});

test('renders Login when user is not logged in', () => {
  render(<App />);

  expect(
    screen.getByText(/Login to access the full dashboard/i)
  ).toBeInTheDocument();
});

test('renders CourseList after logging in', () => {
  render(<App />);

  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: 'test@example.com' },
  });

  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: '12345678' },
  });

  fireEvent.click(
    screen.getByRole('button', { name: /ok/i })
  );

  expect(screen.getByRole('table')).toBeInTheDocument();
});

test('logs out when ctrl+h is pressed', () => {
  render(<App />);

  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: 'test@example.com' },
  });

  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: '12345678' },
  });

  fireEvent.click(
    screen.getByRole('button', { name: /ok/i })
  );

  expect(screen.getByRole('table')).toBeInTheDocument();

  fireEvent.keyDown(document, {
    key: 'h',
    ctrlKey: true,
  });

  expect(
    screen.getByText(/Login to access the full dashboard/i)
  ).toBeInTheDocument();
});

test('displays alert when ctrl+h is pressed', () => {
  const alertMock = jest
    .spyOn(window, 'alert')
    .mockImplementation(() => {});

  render(<App />);

  fireEvent.keyDown(document, {
    key: 'h',
    ctrlKey: true,
  });

  expect(alertMock).toHaveBeenCalledWith('Logging you out');

  alertMock.mockRestore();
});

test('displays the school news by default', () => {
  render(<App />);

  expect(
    screen.getByRole('heading', {
      name: /News from the School/i,
    })
  ).toBeInTheDocument();

  expect(
    screen.getByText(
      /Lorem ipsum dolor sit amet consectetur/i
    )
  ).toBeInTheDocument();
});
