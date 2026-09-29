import { memo } from 'react';
import NotificationItem from './NotificationItem';
import closeIcon from '../assets/close-button.png';

function Notifications(props) {
    const {
        notifications = [],
        displayDrawer = false,
        handleDisplayDrawer,
        handleHideDrawer,
        markNotificationAsRead,
    } = props;

    const shouldBounce = notifications.length > 0 && !displayDrawer;

    const hasNoNotifications = Array.isArray(notifications) && notifications.length === 0;

    return (
        <>
            <div onClick={handleDisplayDrawer}
                className={`text-right notification-title ${shouldBounce ? 'animate-bounce' : ''}`}
            >
                Your notifications
            </div>

            {displayDrawer && (
                <div className='notifications-panel border border-dashed border-[var(--main-color)] w-1/4 p-[6px] max-[912px]:fixed max-[912px]:inset-0 max-[912px]:z-50 max-[912px]:w-auto max-[912px]:overflow-y-auto max-[912px]:bg-white max-[912px]:p-3'>

                    <button
                        aria-label='Close'
                        onClick={handleHideDrawer}
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
                                {notifications.map((notification) => (
                                    <NotificationItem
                                        key={notification.id}
                                        id={notification.id}
                                        type={notification.type}
                                        html={notification.html}
                                        value={notification.value}
                                        markAsRead={markNotificationAsRead}
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


export default memo(Notifications);
