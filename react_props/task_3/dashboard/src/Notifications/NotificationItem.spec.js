import { render, screen } from '@testing-library/react';
import NotificationItem from './NotificationItem';

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
