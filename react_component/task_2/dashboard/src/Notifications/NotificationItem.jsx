import React from 'react';

class NotificationItem extends React.Component {
    render() {
        const {
            id,
            type,
            html,
            value,
            markAsRead,
        } = this.props;

        return (
            <li
                data-notification-type={type}
                style={{ color: type === 'default' ? 'blue' : 'red' }}
                onClick={() => markAsRead(id)}
            >
                {html ? (
                    <span dangerouslySetInnerHTML={html} />
                ) : (
                    value
                )}
            </li>
        );
    }
}

export default NotificationItem;
