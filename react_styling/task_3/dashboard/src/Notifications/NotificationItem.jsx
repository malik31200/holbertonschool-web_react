import React from 'react';

class NotificationItem extends React.PureComponent {
    render() {
        const {
            id,
            type,
            html,
            value,
            markAsRead,
        } = this.props;

        const colorClass =
            type === 'default'
                ? 'text-[var(--default-notification-item)]'
                : 'text-[var(--urgent-notification-item)]';

        if (html) {
            return (
                <li
                    data-notification-type={type}
                    className={colorClass}
                    dangerouslySetInnerHTML={html}
                    onClick={() => markAsRead(id)}
                />
            );
        }

        return (
            <li
                data-notification-type={type}
                className={colorClass}
                onClick={() => markAsRead(id)}
            >
                {value}
            </li>
        );
    }
}

export default NotificationItem;
