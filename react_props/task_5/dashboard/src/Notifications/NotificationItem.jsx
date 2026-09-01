function NotificationItem({ type, html, value }) {
    if (html) {
        return (
            <li
                data-notification-type={type}
                style={{ color: type === 'default' ? 'blue' : 'red' }}
                dangerouslySetInnerHTML={html}
            />
        );
    }

    return (
        <li
            data-notification-type={type}
            style={{ color: type === 'default' ? 'blue' : 'red' }}
        >
            {value}
        </li>
    );
}

export default NotificationItem;
