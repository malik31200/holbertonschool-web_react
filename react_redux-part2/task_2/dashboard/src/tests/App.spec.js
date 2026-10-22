import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import App from '../App';
import mockAxios from 'jest-mock-axios';

import authReducer from '../features/auth/authSlice';
import coursesReducer from '../features/courses/coursesSlice';
import notificationsReducer from '../features/notifications/notificationsSlice';

afterEach(() => {
  mockAxios.reset();
});

const renderWithRedux = () => {
  const store = configureStore({
    reducer: {
      auth: authReducer,
      courses: coursesReducer,
      notifications: notificationsReducer,
    },
  });

  return render(
    <Provider store={store}>
      <App />
    </Provider>
  );
};

const mockNotificationsResponse = {
  data: {
    notifications: [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
      { id: 3, type: 'urgent', html: { __html: '' } },
    ],
  },
};

const mockCoursesResponse = {
  data: {
    courses: [
      { id: 1, name: 'ES6', credit: 60 },
      { id: 2, name: 'Webpack', credit: 20 },
      { id: 3, name: 'React', credit: 40 },
    ],
  },
};

test('The App component renders without crashing', async () => {
  renderWithRedux();

  mockAxios.mockResponse(mockNotificationsResponse);

  await waitFor(() => {
    expect(mockAxios.get).toHaveBeenCalled();
  });
});

test('The App component renders Login by default (user not logged in)', async () => {
  renderWithRedux();

  mockAxios.mockResponse(mockNotificationsResponse);

  await waitFor(() => {
    const emailLabelElement = screen.getByLabelText(/email/i);
    const passwordLabelElement = screen.getByLabelText(/password/i);
    const buttonElements = screen.getAllByRole('button', { name: /ok/i });

    expect(emailLabelElement).toBeInTheDocument();
    expect(passwordLabelElement).toBeInTheDocument();
    expect(buttonElements.length).toBeGreaterThanOrEqual(1);
  });
});

test('it should display "News from the School" title and paragraph by default', async () => {
  renderWithRedux();

  mockAxios.mockResponse(mockNotificationsResponse);

  await waitFor(() => {
    const newsTitle = screen.getByRole('heading', {
      name: /news from the school/i,
    });
    const newsParagraph = screen.getByText(/holberton school news goes here/i);

    expect(newsTitle).toBeInTheDocument();
    expect(newsParagraph).toBeInTheDocument();
  });
});


test('clicking on a notification item removes it from the list', async () => {
  const { container } = renderWithRedux();

  mockAxios.mockResponse(mockNotificationsResponse);

  await waitFor(() => {
    expect(
      container.querySelectorAll('[data-notification-type]').length
    ).toBeGreaterThan(0);
  });

  const notificationTitle = screen.getByText(/your notifications/i);
  fireEvent.click(notificationTitle);

  const notificationItems = container.querySelectorAll(
    '[data-notification-type]'
  );
  const initialCount = notificationItems.length;

  fireEvent.click(notificationItems[0]);

  await waitFor(() => {
    expect(
      container.querySelectorAll('[data-notification-type]').length
    ).toBe(initialCount - 1);
  });
});

test('clicking the notification title and close button toggles the drawer', async () => {
  const { container } = renderWithRedux();

  mockAxios.mockResponse(mockNotificationsResponse);

  await waitFor(() => {
    expect(
      container.querySelector('[class*="notificationItems"]')
    ).not.toBeNull();
  });

  const drawer = container.querySelector('[class*="notificationItems"]');
  const notificationTitle = screen.getByText(/your notifications/i);

  // The drawer starts hidden.
  expect(drawer.className).not.toContain('visible');

  // Open the drawer.
  fireEvent.click(notificationTitle);
  expect(drawer.className).toContain('visible');

  expect(
    screen.getByText(/here is the list of notifications/i)
  ).toBeInTheDocument();

  // Close the drawer.
  fireEvent.click(screen.getByRole('button', { name: /close/i }));
  expect(drawer.className).not.toContain('visible');

  // The content remains mounted, even when hidden.
  expect(
    screen.getByText(/here is the list of notifications/i)
  ).toBeInTheDocument();

  // Open it again.
  fireEvent.click(notificationTitle);
  expect(drawer.className).toContain('visible');
});

test('closing the drawer keeps the notification title visible', async () => {
  renderWithRedux();

  mockAxios.mockResponse(mockNotificationsResponse);

  await waitFor(() => {
    expect(screen.getByText(/your notifications/i)).toBeInTheDocument();
  });

  fireEvent.click(screen.getByText(/your notifications/i));

  const closeButton = screen.getByRole('button', { name: /close/i });
  fireEvent.click(closeButton);

  expect(screen.getByText(/your notifications/i)).toBeInTheDocument();
});

test('logIn function updates user state with email, password, and isLoggedIn true', async () => {
  renderWithRedux();

  mockAxios.mockResponse(mockNotificationsResponse);

  await waitFor(() => {
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });

  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);

  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(
    screen.getByRole('heading', { name: /log in to continue/i })
  ).toBeInTheDocument();

  fireEvent.change(emailInput, {
    target: { value: 'test@example.com' },
  });
  fireEvent.change(passwordInput, {
    target: { value: 'password123' },
  });

  const submitButton = screen.getByRole('button', { name: /ok/i });
  fireEvent.click(submitButton);

  mockAxios.mockResponse(mockCoursesResponse);

  await waitFor(() => {
    expect(screen.queryByLabelText(/email/i)).not.toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /course list/i })
    ).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
  });
});

test('logOut function resets user state to isLoggedIn false with empty email and password', async () => {
  renderWithRedux();

  mockAxios.mockResponse(mockNotificationsResponse);

  await waitFor(() => {
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });

  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole('button', { name: /ok/i });

  fireEvent.change(emailInput, {
    target: { value: 'test@example.com' },
  });
  fireEvent.change(passwordInput, {
    target: { value: 'password123' },
  });
  fireEvent.click(submitButton);

  mockAxios.mockResponse(mockCoursesResponse);

  await waitFor(() => {
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /course list/i })
    ).toBeInTheDocument();
  });

  const logoutLink = screen.getByText(/logout/i);
  fireEvent.click(logoutLink);

  expect(screen.queryByText(/welcome/i)).not.toBeInTheDocument();
  expect(
    screen.queryByRole('heading', { name: /course list/i })
  ).not.toBeInTheDocument();
  expect(
    screen.getByRole('heading', { name: /log in to continue/i })
  ).toBeInTheDocument();
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
});

test('verify notifications data is fetched when App component loads initially', async () => {
  renderWithRedux();

  expect(mockAxios.get).toHaveBeenCalledWith(
    'http://localhost:5173/notifications.json'
  );

  mockAxios.mockResponse(mockNotificationsResponse);

  await waitFor(() => {
    expect(screen.getByText('New course available')).toBeInTheDocument();
    expect(screen.getByText('New resume available')).toBeInTheDocument();
  });
});

test('verify courses data is fetched when user state changes to logged in', async () => {
  renderWithRedux();

  mockAxios.mockResponse(mockNotificationsResponse);

  await waitFor(() => {
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });

  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole('button', { name: /ok/i });

  fireEvent.change(emailInput, {
    target: { value: 'test@example.com' },
  });
  fireEvent.change(passwordInput, {
    target: { value: 'password123' },
  });
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(mockAxios.get).toHaveBeenCalledWith(
      'http://localhost:5173/courses.json'
    );
  });

  mockAxios.mockResponse(mockCoursesResponse);

  await waitFor(() => {
    expect(screen.getByText('ES6')).toBeInTheDocument();
    expect(screen.getByText('Webpack')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
  });
});
