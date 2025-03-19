function UserDashboard() {
    try {
        const [user, setUser] = React.useState(null);
        const [loading, setLoading] = React.useState(true);
        const [error, setError] = React.useState(null);
        const [stats, setStats] = React.useState({
            listings: 0,
            trades: 0,
            donations: 0,
            foodSaved: 0,
            peopleHelped: 0,
            co2Reduced: 0
        });
        const [recentActivities, setRecentActivities] = React.useState([]);
        const [notifications, setNotifications] = React.useState([]);
        const [quickActions, setQuickActions] = React.useState([]);

        React.useEffect(() => {
            loadDashboardData();
        }, []);

        const loadDashboardData = async () => {
            try {
                setLoading(true);
                
                // Get current user
                const userData = localStorage.getItem('currentUser');
                if (!userData) {
                    throw new Error('User not found');
                }
                const currentUser = JSON.parse(userData);
                
                // Get user details from database
                const userDetails = await db.get(db.STORES.users, parseInt(currentUser.id));
                if (!userDetails) {
                    throw new Error('User details not found');
                }

                setUser(userDetails);
                
                // Get user's listings
                const allListings = await db.getAll(db.STORES.listings);
                const userListings = allListings.filter(listing => listing.userId === parseInt(currentUser.id));
                
                // Calculate stats
                const donationCount = userListings.filter(l => l.type === 'donation').length;
                const tradeCount = userListings.filter(l => l.type === 'trade').length;
                const totalFoodSaved = userListings.reduce((total, l) => total + (l.quantity || 0), 0);
                
                setStats({
                    listings: userListings.length,
                    trades: tradeCount,
                    donations: donationCount,
                    foodSaved: totalFoodSaved,
                    peopleHelped: Math.round(totalFoodSaved / 2),
                    co2Reduced: Math.round(totalFoodSaved * 1.5)
                });

                // Get trades
                const allTrades = await db.getAll(db.STORES.trades);
                const userTrades = allTrades.filter(trade => trade.userId === parseInt(currentUser.id));

                // Get recent activities
                const recentActivities = [
                    ...userListings.map(listing => ({
                        type: 'listing_created',
                        title: 'New Listing Created',
                        description: `You listed "${listing.title}" for ${listing.type}`,
                        time: formatDate(listing.createdAt),
                        icon: 'fa-plus-circle',
                        iconColor: 'text-green-500'
                    })),
                    ...userTrades.map(trade => ({
                        type: 'trade',
                        title: 'Trade Activity',
                        description: `${trade.status === 'completed' ? 'Completed' : 'Started'} trade for ${trade.offeredItem.title}`,
                        time: formatDate(trade.createdAt),
                        icon: 'fa-handshake',
                        iconColor: 'text-blue-500'
                    }))
                ].sort((a, b) => new Date(b.time) - new Date(a.time)).slice(0, 5);

                setRecentActivities(recentActivities);

                // Set quick actions
                const quickActions = [
                    {
                        title: 'List New Food',
                        description: 'Share your surplus food',
                        icon: 'fa-plus',
                        path: '/share',
                        color: 'bg-green-500'
                    },
                    {
                        title: 'Find Food',
                        description: 'Browse available items',
                        icon: 'fa-search',
                        path: '/find',
                        color: 'bg-blue-500'
                    },
                    {
                        title: 'Start Trading',
                        description: 'Exchange food items',
                        icon: 'fa-exchange-alt',
                        path: '/trading',
                        color: 'bg-purple-500'
                    },
                    {
                        title: 'View Impact',
                        description: 'See your contribution',
                        icon: 'fa-chart-line',
                        path: '/impact',
                        color: 'bg-yellow-500'
                    }
                ];
                setQuickActions(quickActions);

                // Set notifications
                const notifications = [
                    // Add upcoming expiry notifications
                    ...userListings
                        .filter(listing => {
                            const daysUntilExpiry = Math.ceil(
                                (new Date(listing.expiryDate) - new Date()) / (1000 * 60 * 60 * 24)
                            );
                            return daysUntilExpiry <= 3 && daysUntilExpiry > 0;
                        })
                        .map(listing => ({
                            title: 'Listing Expiring Soon',
                            message: `Your listing "${listing.title}" expires in ${Math.ceil(
                                (new Date(listing.expiryDate) - new Date()) / (1000 * 60 * 60 * 24)
                            )} days`,
                            time: formatDate(new Date()),
                            read: false,
                            type: 'warning'
                        })),
                    // Add trade notifications
                    ...userTrades
                        .filter(trade => trade.status === 'pending')
                        .map(trade => ({
                            title: 'New Trade Request',
                            message: `Someone wants to trade for your ${trade.offeredItem.title}`,
                            time: formatDate(trade.createdAt),
                            read: false,
                            type: 'trade'
                        }))
                ];
                setNotifications(notifications);

            } catch (error) {
                console.error('Load dashboard data error:', error);
                setError('Failed to load dashboard data. Please try refreshing the page.');
            } finally {
                setLoading(false);
            }
        };

        if (loading) {
            return (
                <div className="max-w-7xl mx-auto py-8 px-4">
                    <div className="animate-pulse space-y-8">
                        <div className="h-32 bg-gray-200 rounded-lg"></div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="h-24 bg-gray-200 rounded-lg"></div>
                            ))}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="h-64 bg-gray-200 rounded-lg"></div>
                            <div className="h-64 bg-gray-200 rounded-lg"></div>
                        </div>
                    </div>
                </div>
            );
        }

        if (error) {
            return (
                <div className="max-w-7xl mx-auto py-8 px-4 text-center">
                    <i className="fas fa-exclamation-circle text-red-500 text-4xl mb-4"></i>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <Button
                        variant="secondary"
                        onClick={loadDashboardData}
                    >
                        Try Again
                    </Button>
                </div>
            );
        }

        return (
            <div className="max-w-7xl mx-auto py-8 px-4">
                {/* Welcome Section */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                    <div className="flex items-center">
                        <Avatar src={user?.avatar} size="xl" />
                        <div className="ml-6">
                            <h1 className="text-2xl font-bold text-gray-900">
                                Welcome back, {user?.name}!
                            </h1>
                            <p className="text-gray-600">
                                Here's what's happening with your food sharing activities
                            </p>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    {[
                        { label: 'Active Listings', value: stats.listings, icon: 'fa-list' },
                        { label: 'Food Saved', value: `${stats.foodSaved}kg`, icon: 'fa-apple-whole' },
                        { label: 'People Helped', value: stats.peopleHelped, icon: 'fa-users' },
                        { label: 'CO2 Reduced', value: `${stats.co2Reduced}kg`, icon: 'fa-leaf' }
                    ].map((stat, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                            <div className="flex items-center">
                                <div className={`w-12 h-12 rounded-full bg-green-100 flex items-center justify-center`}>
                                    <i className={`fas ${stat.icon} text-green-600 text-xl`}></i>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm text-gray-500">{stat.label}</p>
                                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Quick Actions */}
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {quickActions.map((action, index) => (
                                <button
                                    key={index}
                                    onClick={() => window.location.href = action.path}
                                    className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
                                >
                                    <div className="flex items-center">
                                        <div className={`w-10 h-10 rounded-full ${action.color} flex items-center justify-center`}>
                                            <i className={`fas ${action.icon} text-white`}></i>
                                        </div>
                                        <div className="ml-4 text-left">
                                            <h3 className="font-medium text-gray-900">{action.title}</h3>
                                            <p className="text-sm text-gray-500">{action.description}</p>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Recent Activities */}
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-gray-900">Recent Activities</h2>
                        <Card>
                            <div className="divide-y divide-gray-200">
                                {recentActivities.length > 0 ? (
                                    recentActivities.map((activity, index) => (
                                        <div key={index} className="p-4">
                                            <div className="flex items-start">
                                                <div className={`mt-1 ${activity.iconColor}`}>
                                                    <i className={`fas ${activity.icon}`}></i>
                                                </div>
                                                <div className="ml-3">
                                                    <p className="text-sm font-medium text-gray-900">
                                                        {activity.title}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        {activity.description}
                                                    </p>
                                                    <p className="text-xs text-gray-400 mt-1">
                                                        {activity.time}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-4 text-center text-gray-500">
                                        No recent activities
                                    </div>
                                )}
                            </div>
                        </Card>
                    </div>
                </div>

                {/* Notifications */}
                {notifications.length > 0 && (
                    <div className="mt-8">
                        <h2 className="text-lg font-semibold text-gray-900 mb-6">Notifications</h2>
                        <div className="space-y-4">
                            {notifications.map((notification, index) => (
                                <Card key={index}>
                                    <div className="p-4">
                                        <div className="flex items-start">
                                            <div className="flex-shrink-0">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                                    notification.type === 'warning' ? 'bg-yellow-100' : 'bg-blue-100'
                                                }`}>
                                                    <i className={`fas ${
                                                        notification.type === 'warning' ? 'fa-exclamation-triangle text-yellow-600' : 'fa-handshake text-blue-600'
                                                    }`}></i>
                                                </div>
                                            </div>
                                            <div className="ml-3 flex-1">
                                                <p className="text-sm font-medium text-gray-900">
                                                    {notification.title}
                                                </p>
                                                <p className="mt-1 text-sm text-gray-500">
                                                    {notification.message}
                                                </p>
                                                <p className="mt-1 text-xs text-gray-400">
                                                    {notification.time}
                                                </p>
                                            </div>
                                            {!notification.read && (
                                                <div className="ml-3">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                        New
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    } catch (error) {
        console.error('UserDashboard error:', error);
        reportError(error);
        return null;
    }
}
