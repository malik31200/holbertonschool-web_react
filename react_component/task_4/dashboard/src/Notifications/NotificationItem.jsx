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

        if (html) {
            return (
                <li
                    data-notification-type={type}
                    style={{ color: type === 'default' ? 'blue' : 'red' }}
                    dangerouslySetInnerHTML={html}
                    onClick={() => markAsRead(id)}
                />
            );
        }

        return (
            <li
                data-notification-type={type}
                style={{ color: type === 'default' ? 'blue' : 'red' }}
                onClick={() => markAsRead(id)}
            >
                {value}
            </li>
        );
    }
}

export default NotificationItem;
