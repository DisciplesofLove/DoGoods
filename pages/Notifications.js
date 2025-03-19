function Notifications() {
    try {
        const [notifications, setNotifications] = React.useState([
            {
                id: 1,
                type: 'food_claimed',
                title: 'Food Claimed',
                message: 'Someone has claimed your food listing "Fresh Vegetables"',
                time: '2 hours ago',
                read: false
            },
            {
                id: 2,
                type: 'trade_request',
                title: 'New Trade Request',
                message: 'You have received a new trade request for "Homemade Bread"',
                time: '5 hours ago',
                read: false
            },
            {
                id: 3,
                type: 'system',
                title: 'Welcome to ShareFoods',
                message: 'Thank you for joining our community! Start sharing food today.',
                time: '1 day ago',
                read: true
            }
        ]);

        const markAsRead = (notificationId) => {
            setNotifications(notifications.map(notification =>
                notification.id === notificationId
                    ? { ...notification, read: true }
                    : notification
            ));
        };

        const markAllAsRead = () => {
            setNotifications(notifications.map(notification => ({
                ...notification,
                read: true
            })));
        };

        const deleteNotification = (notificationId) => {
            setNotifications(notifications.filter(notification =>
                notification.id !== notificationId
            ));
        };

        const getNotificationIcon = (type) => {
            switch (type) {
                case 'food_claimed':
                    return 'fa-hand-holding-heart';
                case 'trade_request':
                    return 'fa-exchange-alt';
                case 'system':
                    return 'fa-bell';
                default:
                    return 'fa-info-circle';
            }
        };

        return (
            <div className="max-w-4xl mx-auto py-8 px-4">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
                    <div className="space-x-4">
                        <Button
                            variant="secondary"
                            onClick={markAllAsRead}
                        >
                            Mark All as Read
                        </Button>
                    </div>
                </div>

                <div className="space-y-4">
                    {notifications.length === 0 ? (
                        <div className="text-center py-12">
                            <i className="fas fa-bell text-gray-400 text-4xl mb-4"></i>
                            <p className="text-gray-600">No notifications yet</p>
                        </div>
                    ) : (
                        notifications.map(notification => (
                            <Card
                                key={notification.id}
                                className={`transition-colors duration-200 ${
                                    notification.read ? 'bg-white' : 'bg-green-50'
                                }`}
                            >
                                <div className="p-4">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0">
                                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                                <i className={`fas ${getNotificationIcon(notification.type)} text-green-600`}></i>
                                            </div>
                                        </div>
                                        <div className="ml-4 flex-1">
                                            <div className="flex items-center justify-between">
                                                <h2 className="text-lg font-semibold text-gray-900">
                                                    {notification.title}
                                                </h2>
                                                <div className="flex items-center space-x-4">
                                                    <span className="text-sm text-gray-500">
                                                        {notification.time}
                                                    </span>
                                                    <div className="flex space-x-2">
                                                        {!notification.read && (
                                                            <button
                                                                onClick={() => markAsRead(notification.id)}
                                                                className="text-green-600 hover:text-green-700"
                                                            >
                                                                <i className="fas fa-check"></i>
                                                            </button>
                                                        )}
                                                        <button
                                                            onClick={() => deleteNotification(notification.id)}
                                                            className="text-red-600 hover:text-red-700"
                                                        >
                                                            <i className="fas fa-trash"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="mt-1 text-gray-600">
                                                {notification.message}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))
                    )}
                </div>
            </div>
        );
    } catch (error) {
        console.error('Notifications error:', error);
        reportError(error);
        return null;
    }
}
