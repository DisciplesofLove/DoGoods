function ProfilePage() {
    try {
        const [user, setUser] = React.useState(null);
        const [activeTab, setActiveTab] = React.useState('profile');
        const [loading, setLoading] = React.useState(true);
        const [error, setError] = React.useState(null);
        const [stats, setStats] = React.useState({
            donations: 0,
            trades: 0,
            foodSaved: 0,
            impact: 0
        });
        const [listings, setListings] = React.useState([]);
        const [trades, setTrades] = React.useState([]);

        React.useEffect(() => {
            loadUserData();
        }, []);

        const loadUserData = async () => {
            setLoading(true);
            try {
                // Get current user from localStorage
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
                
                // Get user listings from database
                const allListings = await db.getAll(db.STORES.listings);
                const userListings = allListings.filter(listing => listing.userId === parseInt(currentUser.id));
                
                setUser({
                    ...userDetails,
                    stats: {
                        donations: userListings.filter(l => l.type === 'donation').length,
                        trades: userListings.filter(l => l.type === 'trade').length,
                        impact: userListings.reduce((total, listing) => total + (listing.quantity || 0), 0)
                    }
                });
                
                setListings(userListings);

                // Calculate stats
                setStats({
                    donations: userListings.filter(l => l.type === 'donation').length,
                    trades: userListings.filter(l => l.type === 'trade').length,
                    foodSaved: userListings.reduce((total, l) => total + (l.quantity || 0), 0),
                    impact: Math.round(userListings.reduce((total, l) => total + (l.quantity || 0) * 1.5, 0))
                });

                // Get user trades
                const allTrades = await db.getAll(db.STORES.trades);
                const userTrades = allTrades.filter(trade => trade.userId === parseInt(currentUser.id));
                setTrades(userTrades);

            } catch (error) {
                console.error('Load user data error:', error);
                setError('Failed to load user data');
            } finally {
                setLoading(false);
            }
        };

        const handleEditListing = (listing) => {
            window.location.href = `/share?edit=${listing.id}`;
        };

        const handleDeleteListing = async (listing) => {
            if (!confirm('Are you sure you want to delete this listing?')) return;

            try {
                await db.delete(db.STORES.listings, listing.id);
                await loadUserData();
                alert('Listing deleted successfully');
            } catch (error) {
                console.error('Delete listing error:', error);
                alert('Failed to delete listing. Please try again.');
            }
        };

        const handleAcceptTrade = async (trade) => {
            try {
                await db.update(db.STORES.trades, trade.id, {
                    ...trade,
                    status: 'accepted'
                });
                await loadUserData();
                alert('Trade accepted successfully');
            } catch (error) {
                console.error('Accept trade error:', error);
                alert('Failed to accept trade');
            }
        };

        const handleDeclineTrade = async (trade) => {
            try {
                await db.update(db.STORES.trades, trade.id, {
                    ...trade,
                    status: 'declined'
                });
                await loadUserData();
                alert('Trade declined successfully');
            } catch (error) {
                console.error('Decline trade error:', error);
                alert('Failed to decline trade');
            }
        };

        const handleCompleteTrade = async (trade) => {
            try {
                await db.update(db.STORES.trades, trade.id, {
                    ...trade,
                    status: 'completed'
                });
                await loadUserData();
                alert('Trade marked as completed');
            } catch (error) {
                console.error('Complete trade error:', error);
                alert('Failed to complete trade');
            }
        };

        if (loading) {
            return (
                <div className="max-w-7xl mx-auto py-8 px-4">
                    <div className="animate-pulse space-y-8">
                        <div className="h-32 bg-gray-200 rounded-lg"></div>
                        <div className="h-64 bg-gray-200 rounded-lg"></div>
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
                        onClick={loadUserData}
                    >
                        Try Again
                    </Button>
                </div>
            );
        }

        return (
            <div className="max-w-7xl mx-auto py-8 px-4">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
                    <div className="p-6">
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
                            <div className="flex items-center mb-4 md:mb-0">
                                <Avatar
                                    src={user?.avatar}
                                    size="xl"
                                />
                                <div className="ml-4">
                                    <h1 className="text-2xl font-bold text-gray-900">{user?.name}</h1>
                                    <p className="text-gray-600">{user?.email}</p>
                                </div>
                            </div>
                            <Button
                                variant="secondary"
                                icon={<i className="fas fa-edit"></i>}
                                onClick={() => window.location.href = '/settings'}
                            >
                                Edit Profile
                            </Button>
                        </div>

                        <ProfileStats stats={stats} />
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="border-b border-gray-200">
                        <nav className="flex">
                            <button
                                onClick={() => setActiveTab('listings')}
                                className={`px-6 py-4 text-sm font-medium border-b-2 ${
                                    activeTab === 'listings'
                                        ? 'border-green-500 text-green-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                My Listings
                            </button>
                            <button
                                onClick={() => setActiveTab('trades')}
                                className={`px-6 py-4 text-sm font-medium border-b-2 ${
                                    activeTab === 'trades'
                                        ? 'border-green-500 text-green-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                My Trades
                            </button>
                            <button
                                onClick={() => setActiveTab('impact')}
                                className={`px-6 py-4 text-sm font-medium border-b-2 ${
                                    activeTab === 'impact'
                                        ? 'border-green-500 text-green-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                Impact
                            </button>
                        </nav>
                    </div>

                    <div className="p-6">
                        {activeTab === 'listings' && (
                            <ListingsTab
                                listings={listings}
                                onEdit={handleEditListing}
                                onDelete={handleDeleteListing}
                            />
                        )}

                        {activeTab === 'trades' && (
                            <TradesTab
                                trades={trades}
                                onAccept={handleAcceptTrade}
                                onDecline={handleDeclineTrade}
                                onComplete={handleCompleteTrade}
                            />
                        )}

                        {activeTab === 'impact' && (
                            <ImpactTab
                                impact={{
                                    foodSaved: stats.foodSaved,
                                    co2Reduced: stats.impact,
                                    peopleHelped: Math.round(stats.foodSaved / 2),
                                    carMilesSaved: Math.round(stats.impact * 2.4),
                                    waterSaved: Math.round(stats.foodSaved * 1000),
                                    energySaved: Math.round(stats.impact * 1.8)
                                }}
                            />
                        )}
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('ProfilePage error:', error);
        reportError(error);
        return null;
    }
}
