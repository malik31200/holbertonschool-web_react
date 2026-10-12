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

        const responsiveClass = 'max-[912px]:!text-base max-[912px]:border-b max-[912px]:border-gray-300 max-[912px]:py-3 max-[912px]:px-1';

        if (html) {
            return (
                <li
                    data-notification-type={type}
                    className={`${colorClass} ${responsiveClass}`}
                    dangerouslySetInnerHTML={html}
                    onClick={() => markAsRead(id)}
                />
            );
        }

        return (
            <li
                data-notification-type={type}
                className={`${colorClass} ${responsiveClass}`}
                onClick={() => markAsRead(id)}
            >
                {value}
            </li>
        );
    }
}

export default NotificationItem;
