import { fireEvent, render, screen } from '@testing-library/react';
import Notifications from './Notifications';

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

test('logs when a notification is clicked', () => {
    const consoleSpy = jest
        .spyOn(console, 'log')
        .mockImplementation(() => {});

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
            notifications={notifications}
            displayDrawer={true}
        />,
    );

    const items = screen.getAllByRole('listitem');

    fireEvent.click(items[0]);

    expect(consoleSpy).toHaveBeenCalledWith(
        'Notification 1 has been marked as read',
    );

    consoleSpy.mockRestore();
});

test('does not re-render when notifications length stays the same', () => {
    const notifications = [
        { id: 1, type: 'default', value: 'Notification 1' },
        { id: 2, type: 'urgent', value: 'Notification 2' },
    ];

    const { rerender } = render(
        <Notifications
            notifications={notifications}
            displayDrawer={true}
        />,
    );

    const firstItem = screen.getByText('Notification 1');

    rerender(
        <Notifications
            notifications={[
                { id: 3, type: 'default', value: 'New notification' },
                { id: 4, type: 'urgent', value: 'Another notification' },
            ]}
            displayDrawer={true}
        />,
    );

    expect(screen.getByText('Notification 1')).toBe(firstItem);
});

test('re-renders when notifications length changes', () => {
    const notifications = [
        { id: 1, type: 'default', value: 'Notification 1' },
    ];

    const { rerender } = render(
        <Notifications
            notifications={notifications}
            displayDrawer={true}
        />,
    );

    rerender(
        <Notifications
            notifications={[
                { id: 1, type: 'default', value: 'Notification 1' },
                { id: 2, type: 'urgent', value: 'Notification 2' },
            ]}
            displayDrawer={true}
        />,
    );

    expect(screen.getByText('Notification 2')).toBeInTheDocument();
});
