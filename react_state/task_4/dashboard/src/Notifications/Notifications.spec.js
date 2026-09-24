import { render, screen, fireEvent } from '@testing-library/react';
import Notifications from './Notifications.jsx';

test('check the existence of the notifications title', () => {
    render(
        <Notifications
            displayDrawer={true}
            notifications={[
                {
                    id: 1,
                    type: 'default',
                    value: 'New course available',
                },
            ]}
        />
    );

    expect(
        screen.getByText(/Here is the list of notifications/i)
    ).toBeInTheDocument();
});

test('check the existence of the button element', () => {
    render(
        <Notifications
            displayDrawer={true}
            notifications={[]}
        />
    );

    expect(screen.getByRole('button', { name: /close/i })
    ).toBeInTheDocument();
});

test('renders 3 li elements', () => {
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
        {
            id: 3,
            type: 'urgent',
            value: '<strong>Urgent requirement</strong> - complete by EOD',
            html: {
                __html: '<strong>Urgent requirement</strong> - complete by EOD',
            },
        },
    ];
    render(<Notifications
                displayDrawer={true}
                notifications={notifications}
            />
        );

    expect(screen.getAllByRole('listitem')
    ).toHaveLength(3);
});

test('calls handleHideDrawer when the close button is clicked', () => {
    const handleHideDrawer = jest.fn();

    render(<Notifications
                displayDrawer={true}
                notifications={[]}
                handleHideDrawer={handleHideDrawer}
        />
    );

    fireEvent.click(
        screen.getByRole('button', { name: /close/i })
    )

   expect(handleHideDrawer).toHaveBeenCalled();

});

test('calls handleDisplayDrawer when the notifications title is clicked', () => {
    const handleDisplayDrawer = jest.fn();

    render(
        <Notifications
            displayDrawer={false}
            notifications={[]}
            handleDisplayDrawer={handleDisplayDrawer}
        />
    );

    fireEvent.click(
        screen.getByText(/Your notifications/i)
    );

    expect(handleDisplayDrawer).toHaveBeenCalled();
});
