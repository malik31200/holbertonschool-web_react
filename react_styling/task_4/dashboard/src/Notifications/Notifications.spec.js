import { render, screen, fireEvent } from '@testing-library/react';
import Notifications from './Notifications.jsx';

test('check the existence of the notifications title', () => {
    render(<Notifications />);

    expect(screen.getByText(/Here is the list of notifications/i)
    ).toBeInTheDocument();
});

test('check the existence of the button elemente', () => {
    render(<Notifications />);

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
    render(<Notifications  notifications={notifications} />);

    expect(screen.getAllByRole('listitem')
    ).toHaveLength(3);
});

test('logs a message when the close button is clicked', () => {
    render(<Notifications />);

   const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

   fireEvent.click(screen.getByRole('button', { name: /close/i }));

   expect(consoleSpy).toHaveBeenCalledWith(
    'Close button has been clicked'
   );

   consoleSpy.mockRestore();
});
