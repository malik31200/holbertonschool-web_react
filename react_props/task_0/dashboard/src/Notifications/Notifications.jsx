import './Notifications.css';
import closeIcon from '../assets/close-button.png';
import { getLatestNotification } from '../utils/utils';

function Notifications() {
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
                <li data-priority="default">New course available</li>
                <li data-priority="urgent">New resume available</li>
                <li
                    data-priority="urgent"
                    dangerouslySetInnerHTML={{ __html: getLatestNotification() }}
                />
            </ul>
        </div>
    );
}
export default Notifications;