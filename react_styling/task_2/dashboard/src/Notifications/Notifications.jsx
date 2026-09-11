import React from 'react';
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
            displayDrawer = true,
        } = this.props;
        return (
            <>
                <div className='text-right'>
                    Your notifications
                </div>

                {displayDrawer && (
                    <div className='notifications-panel border border-dashed border-[var(--main-color)] w-1/4 p-[6px]'>
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
                          Here is the list of notifications
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
