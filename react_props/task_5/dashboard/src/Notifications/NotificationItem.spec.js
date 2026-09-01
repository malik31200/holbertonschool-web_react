import { render, screen } from '@testing-library/react';
import NotificationItem from './NotificationItem';
import Notifications from './Notifications';

test('renders a default notification in blue', () => {
    render(
        <NotificationItem
            type="default"
            value="New course available"
        />
    );

    const notification = screen.getByText(/new course available/i);

    expect(notification).toHaveStyle({ color: 'blue' });
    expect(notification).toHaveAttribute(
        'data-notification-type',
        'default'
    );
});

test('renders an urgent notif in red', () => {
    render(
        <NotificationItem
            type="urgent"
            value="New resume available"
        />
    );

    const notification = screen.getByText(/new resume available/i);

    expect(notification).toHaveStyle({ color: 'red' });
    expect(notification).toHaveAttribute(
        'data-notification-type',
        'urgent'
    );
});

test('does not display notifications when displayDrawer is false', () => {
    render(
        <Notifications
            displayDrawer={false}
            notifications={[
                {
                    id: 1,
                    type: 'default',
                    value: 'New course available',
                },
            ]}
        />
    );

    expect(screen.getByText(/Your notifications/i)).toBeInTheDocument();

    expect(
        screen.queryByRole('button', { name: /close/i })
    ).not.toBeInTheDocument();

    expect(
        screen.queryByText(/Here is the list of notifications/i)
    ).not.toBeInTheDocument();

    expect(
        screen.queryByRole('listitem')
    ).not.toBeInTheDocument();
});

test('displays notifications when displayDrawer is true', () => {
    const notifications = [
        {
            id: 1,
            type: 'default',
            value: 'New course available',
        },
        {
            id: 2,
            type: 'urgent',
            value: 'New resume available',
        },
    ];

    render(
        <Notifications
            displayDrawer={true}
            notifications={notifications}
        />
    );

    expect(
        screen.getByText(/Your notifications/i)
    ).toBeInTheDocument();

    expect(
        screen.getByRole('button', { name: /close/i })
    ).toBeInTheDocument();

    expect(
        screen.getByText(/Here is the list of notifications/i)
    ).toBeInTheDocument();

    expect(
        screen.getAllByRole('listitem')
    ).toHaveLength(2);
});
