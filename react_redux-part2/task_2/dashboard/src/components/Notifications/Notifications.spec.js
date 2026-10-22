import { render, screen, fireEvent, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Notifications from './Notifications';
import notificationsReducer, {
  markNotificationAsRead,
} from '../../features/notifications/notificationsSlice';
import { getLatestNotification } from '../../utils/utils';
import { css } from 'aphrodite';

jest.mock('../../utils/utils', () => ({
  getLatestNotification: jest.fn(),
}));

describe('Notifications component', () => {
  beforeEach(() => {
    getLatestNotification.mockReturnValue(
      '<strong>Urgent requirement</strong> - complete by EOD'
    );
  });

  const defaultNotifications = [
    { id: 1, type: 'default', value: 'New course available' },
    { id: 2, type: 'urgent', value: 'New resume available' },
    { id: 3, type: 'urgent', html: { __html: getLatestNotification() } },
  ];

  const renderWithRedux = ({
    notifications = defaultNotifications,
    loading = false,
  } = {}) => {
    const store = configureStore({
      reducer: {
        notifications: notificationsReducer,
      },
      preloadedState: {
        notifications: {
          notifications,
          loading,
        },
      },
    });

    const result = render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    return { store, ...result };
  };

  test('renders the notifications title', () => {
    renderWithRedux();

    expect(
      screen.getByText(/here is the list of notifications/i)
    ).toBeInTheDocument();
  });

  test('renders the close button', () => {
    renderWithRedux();

    expect(
      screen.getByRole('button', { name: /close/i })
    ).toBeInTheDocument();
  });

  test('clicking close hides the drawer', () => {
    const { container } = renderWithRedux();
    const drawer = container.querySelector('[class*="notificationItems"]');

    fireEvent.click(screen.getByText('Your notifications'));

    expect(drawer.className).toContain('visible');


    fireEvent.click(screen.getByRole('button', { name: /close/i }));

    expect(drawer.className).not.toContain('visible');
  });

  test('displays three notification items', () => {
    renderWithRedux();

    expect(screen.getAllByRole('listitem')).toHaveLength(3);
  });

  test('the drawer content remains in the DOM when hidden', () => {
    const { container } = renderWithRedux();

    const title = screen.getByText(/your notifications/i);
    fireEvent.click(title);

    expect(
      screen.getByText(/here is the list of notifications/i)
    ).toBeInTheDocument();
  });

  test('displays an empty message when there are no notifications', () => {
    renderWithRedux({ notifications: [] });

    expect(
      screen.getByText(/no new notifications for now/i)
    ).toBeInTheDocument();
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });

  test('always displays the Your notifications title', () => {
    renderWithRedux();

    expect(screen.getByText(/your notifications/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/your notifications/i));

    expect(screen.getByText(/your notifications/i)).toBeInTheDocument();
  });

  test('displays the close button, paragraph, and notification items', () => {
    renderWithRedux();

    expect(
      screen.getByRole('button', { name: /close/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/here is the list of notifications/i)
    ).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
  });

  test('removes a notification when its item is clicked', () => {
    const { store } = renderWithRedux();

    fireEvent.click(screen.getAllByRole('listitem')[0]);

    expect(store.getState().notifications.notifications).toHaveLength(2);
    expect(
      store.getState().notifications.notifications.some(
        (notification) => notification.id === 1
      )
    ).toBe(false);
  });

  test('updates when the notifications length changes', () => {
    const { store } = renderWithRedux({
      notifications: [
        { id: 1, type: 'default', value: 'Notification 1' },
      ],
    });

    expect(screen.getAllByRole('listitem')).toHaveLength(1);

    act(() => {
      store.dispatch(markNotificationAsRead(1));
    });

    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });

  test('maintains the content when notifications are unchanged', () => {
    renderWithRedux({
      notifications: [
        { id: 1, type: 'default', value: 'Notification 1' },
        { id: 2, type: 'urgent', value: 'Notification 2' },
      ],
    });

    const listItems = screen.getAllByRole('listitem');

    expect(listItems).toHaveLength(2);
    expect(listItems[0]).toHaveTextContent('Notification 1');
  });

  test('opens and closes the drawer by toggling its class', () => {
    const { container } = renderWithRedux();
    const drawer = screen.getByText(/here is the list of notifications/i)
      .parentElement;
    const title = screen.getByText(/your notifications/i);

    const initialClass = drawer.className;

    fireEvent.click(title);
    expect(drawer.className).not.toBe(initialClass);

    fireEvent.click(title);
    expect(drawer.className).toBe(initialClass);
  });

  
  test('displays a loading message while notifications are loading', () => {
    renderWithRedux({ loading: true });

    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(
      screen.queryByText(/here is the list of notifications/i)
    ).not.toBeInTheDocument();
  });
});
