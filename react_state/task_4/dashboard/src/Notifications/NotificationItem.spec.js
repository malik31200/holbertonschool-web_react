import { fireEvent, render, screen } from '@testing-library/react';
import NotificationItem from './NotificationItem';

test('Check if click on a notif if markAsRead is called', () => {
    const markAsRead = jest.fn();
    render(
        <NotificationItem
            id={1}
            type="default"
            value="New course available"
            markAsRead={markAsRead}
        />
    );

    const notification = screen.getByText(/new course available/i);

    fireEvent.click(notification);

    expect(markAsRead).toHaveBeenCalledWith(1);
    
});