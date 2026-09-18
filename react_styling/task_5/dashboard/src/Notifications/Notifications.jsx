import React from 'react';
import NotificationItem from './NotificationItem';
import closeIcon from '../assets/close-button.png';

class Notifications extends React.Component {
    markAsRead = (id) => {
        console.log(`Notification ${id} has been marked as read`);
    };

    shouldComponentUpdate(nextProps) {
        return (nextProps.notifications?.length ?? 0) !== (this.props.notifications?.length ?? 0);
    }

    render() {
        const {
            notifications = [],
            displayDrawer = true,
        } = this.props;

        const shouldBounce = notifications.length > 0 && !displayDrawer;

        const hasNoNotifications = Array.isArray(notifications) && notifications.length === 0;

        return (
            <>
                <div className={`text-right notification-title ${shouldBounce ? 'animate-bounce' : ''}`}>
                    Your notifications
                </div>

                {displayDrawer && (
                    <div className='notifications-panel border border-dashed border-[var(--main-color)] w-1/4 p-[6px] max-[912px]:fixed max-[912px]:inset-0 max-[912px]:z-50 max-[912px]:w-auto max-[912px]:overflow-y-auto max-[912px]:bg-white max-[912px]:p-3'>

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

                        {hasNoNotifications ? (
                            <p className="max-[912px]:!text-base">No new notification for now</p>
                        ) : (
                            <>
                                <p className="max-[912px]:!text-base">
                                    Here is the list of notifications
                                </p>

                                <ul className="max-[912px]:!list-none max-[912px]:!pl-0">
                                    {(notifications || []).map((notification) => (
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
                            </>
                        )}

                    </div>
                )}
            </>
        );
    }
}

export default Notifications;
