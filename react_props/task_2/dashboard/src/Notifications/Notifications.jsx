import './Notifications.css';
import NotificationItem  from './NotificationItem';
import closeIcon from '../assets/close-button.png';

function Notifications({ notifications = [] }) {
    return (
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

            <p>Here is the list of notifications</p>

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
    );
}
export default Notifications;
