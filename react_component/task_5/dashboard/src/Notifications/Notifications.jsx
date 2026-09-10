import React from 'react';
import './Notifications.css';
import NotificationItem  from './NotificationItem';
import closeIcon from '../assets/close-button.png';


class Notifications extends React.Component {
    markAsRead = (id) => {
        console.log(`Notification ${id} has been marked as read`)
    };

    shouldComponentUpdate(nextProps) {
        return nextProps.notifications.length !== this.props.notifications.length;
    }
    render() {
        const {
            notifications = [],
            displayDrawer = false,
        } = this.props;
        return (
            <>
                <div className='notification-title'>
                    Your notifications
                </div>

                {displayDrawer && (
                    <div className='notification-items'>
                        <button
                        aria-label='Close'
                        onClick={() => console.log('Close button has been clicked')}
                        style={{
                            float: 'right',
                            border: 'none',
                            background: 'none',
                        }}
                        >
                            <img src={closeIcon} alt="close" />
                        </button>

                        <p>
                            {notifications.length === 0
                                ? 'No new notification for now'
                                : 'Here is the list of notifications'}
                        </p>

                        <ul>
                            {notifications.map((notification) => (
                                <NotificationItem
                                    key={notification.id}
                                    id={notification.id}
                                    type={notification.type}
                                    html={notification.html}
                                    value={notification.value}
                                    markAsRead={this.markAsRead}
                                />
                            ))}
                        </ul>
                    </div>
                )}
            </>
        );
    }
}
export default Notifications;
