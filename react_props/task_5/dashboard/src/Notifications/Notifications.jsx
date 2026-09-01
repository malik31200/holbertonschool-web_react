import './Notifications.css';
import NotificationItem  from './NotificationItem';
import closeIcon from '../assets/close-button.png';

function Notifications({ notifications = [],  displayDrawer = false }) {
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
                                type={notification.type}
                                html={notification.html}
                                value={notification.value}
                            />
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
}
export default Notifications;
