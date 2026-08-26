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
    render(<Notifications />);

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
