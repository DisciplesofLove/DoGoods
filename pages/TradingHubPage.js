function TradingHubPage() {
    try {
        const [activeTab, setActiveTab] = React.useState('available');
        const [loading, setLoading] = React.useState(true);
        const [error, setError] = React.useState(null);
        const [trades, setTrades] = React.useState([
            {
                objectId: '1',
                offeredItem: {
                    title: 'Fresh Organic Vegetables',
                    quantity: 5,
                    unit: 'kg',
                    image: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
                },
                requestedItems: [
                    {
                        title: 'Homemade Bread',
                        quantity: 2,
                        unit: 'loaves',
                        image: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
                    },
                    {
                        title: 'Fresh Eggs',
                        quantity: 6,
                        unit: 'eggs',
                        image: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
                    },
                    {
                        title: 'Organic Apples',
                        quantity: 1,
                        unit: 'kg',
                        image: 'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
                    },
                    {
                        title: 'Dairy Products',
                        quantity: 1,
                        unit: 'pack',
                        image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
                    }
                ],
                status: 'pending',
                createdAt: '2024-01-15T09:00:00Z',
                user: {
                    name: 'John Smith',
                    avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
                },
                message: 'Looking to trade fresh vegetables from my garden for some homemade bread, eggs, or fruits.'
            },
            {
                objectId: '2',
                offeredItem: {
                    title: 'Homemade Sourdough Bread',
                    quantity: 3,
                    unit: 'loaves',
                    image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
                },
                requestedItems: [
                    {
                        title: 'Fresh Berries',
                        quantity: 500,
                        unit: 'g',
                        image: 'https://images.unsplash.com/photo-1563746098251-d35aef196e83?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
                    },
                    {
                        title: 'Honey',
                        quantity: 1,
                        unit: 'jar',
                        image: 'https://images.unsplash.com/photo-1587049352851-8d4b89133611?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
                    }
                ],
                status: 'accepted',
                createdAt: '2024-01-14T10:30:00Z',
                user: {
                    name: 'Sarah Johnson',
                    avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
                },
                message: 'Fresh baked sourdough bread available for trade. Looking for fresh fruits or honey.'
            },
            {
                objectId: '3',
                offeredItem: {
                    title: 'Homemade Jam',
                    quantity: 4,
                    unit: 'jars',
                    image: 'https://images.unsplash.com/photo-1563822249366-3efb23b8e0c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
                },
                requestedItems: [
                    {
                        title: 'Fresh Eggs',
                        quantity: 12,
                        unit: 'eggs',
                        image: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
                    },
                    {
                        title: 'Vegetables',
                        quantity: 2,
                        unit: 'kg',
                        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
                    }
                ],
                status: 'completed',
                createdAt: '2024-01-13T14:15:00Z',
                user: {
                    name: 'Emily Brown',
                    avatar: 'https://randomuser.me/api/portraits/women/3.jpg'
                },
                message: 'Homemade strawberry and raspberry jam available for trade.'
            },
            {
                objectId: '4',
                offeredItem: {
                    title: 'Fresh Eggs',
                    quantity: 24,
                    unit: 'eggs',
                    image: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
                },
                requestedItems: [
                    {
                        title: 'Fresh Vegetables',
                        quantity: 3,
                        unit: 'kg',
                        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
                    },
                    {
                        title: 'Fresh Fruits',
                        quantity: 2,
                        unit: 'kg',
                        image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
                    },
                    {
                        title: 'Herbs',
                        quantity: 3,
                        unit: 'bunches',
                        image: 'https://images.unsplash.com/photo-1600231915711-b9d1e8a8a26e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
                    }
                ],
                status: 'pending',
                createdAt: '2024-01-12T16:45:00Z',
                user: {
                    name: 'Michael Wilson',
                    avatar: 'https://randomuser.me/api/portraits/men/4.jpg'
                },
                message: 'Farm fresh eggs available for trade. Looking for fresh vegetables, fruits or herbs.'
            }
        ]);

        React.useEffect(() => {
            loadTrades();
        }, []);

        const loadTrades = async () => {
            setLoading(true);
            try {
                // In a real app, this would be an API call
                await new Promise(resolve => setTimeout(resolve, 1000));
                setLoading(false);
            } catch (error) {
                console.error('Load trades error:', error);
                setError('Failed to load trades');
                setLoading(false);
            }
        };

        const handleAccept = async (trade) => {
            try {
                // In a real app, this would be an API call
                await new Promise(resolve => setTimeout(resolve, 500));
                setTrades(trades.map(t => 
                    t.objectId === trade.objectId
                        ? { ...t, status: 'accepted' }
                        : t
                ));
                alert('Trade accepted successfully!');
            } catch (error) {
                console.error('Accept trade error:', error);
                alert('Failed to accept trade');
            }
        };

        const handleDecline = async (trade) => {
            try {
                // In a real app, this would be an API call
                await new Promise(resolve => setTimeout(resolve, 500));
                setTrades(trades.map(t => 
                    t.objectId === trade.objectId
                        ? { ...t, status: 'declined' }
                        : t
                ));
                alert('Trade declined successfully');
            } catch (error) {
                console.error('Decline trade error:', error);
                alert('Failed to decline trade');
            }
        };

        const handleComplete = async (trade) => {
            try {
                // In a real app, this would be an API call
                await new Promise(resolve => setTimeout(resolve, 500));
                setTrades(trades.map(t => 
                    t.objectId === trade.objectId
                        ? { ...t, status: 'completed' }
                        : t
                ));
                alert('Trade marked as completed!');
            } catch (error) {
                console.error('Complete trade error:', error);
                alert('Failed to complete trade');
            }
        };

        const filteredTrades = trades.filter(trade => {
            if (activeTab === 'available') return trade.status === 'pending';
            if (activeTab === 'active') return trade.status === 'accepted';
            if (activeTab === 'completed') return trade.status === 'completed';
            return true; // 'all' tab
        });

        return (
            <div className="max-w-7xl mx-auto py-8 px-4">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Trading Hub</h1>
                    <p className="mt-2 text-gray-600">
                        Exchange food items with other community members
                    </p>
                </div>

                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="border-b border-gray-200">
                        <nav className="flex">
                            <button
                                onClick={() => setActiveTab('available')}
                                className={`px-6 py-4 text-sm font-medium border-b-2 ${
                                    activeTab === 'available'
                                        ? 'border-green-500 text-green-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                Available Trades
                            </button>
                            <button
                                onClick={() => setActiveTab('active')}
                                className={`px-6 py-4 text-sm font-medium border-b-2 ${
                                    activeTab === 'active'
                                        ? 'border-green-500 text-green-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                Active Trades
                            </button>
                            <button
                                onClick={() => setActiveTab('completed')}
                                className={`px-6 py-4 text-sm font-medium border-b-2 ${
                                    activeTab === 'completed'
                                        ? 'border-green-500 text-green-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                Completed Trades
                            </button>
                            <button
                                onClick={() => setActiveTab('all')}
                                className={`px-6 py-4 text-sm font-medium border-b-2 ${
                                    activeTab === 'all'
                                        ? 'border-green-500 text-green-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                All Trades
                            </button>
                        </nav>
                    </div>

                    <div className="p-6">
                        <div className="mb-6 flex justify-between items-center">
                            <div className="flex space-x-4">
                                <Input
                                    placeholder="Search trades..."
                                    icon={<i className="fas fa-search"></i>}
                                    className="w-64"
                                />
                                <select className="form-select rounded-lg border-gray-300 focus:border-green-500 focus:ring-green-500">
                                    <option value="">All Categories</option>
                                    <option value="vegetables">Vegetables</option>
                                    <option value="fruits">Fruits</option>
                                    <option value="bread">Bread</option>
                                    <option value="dairy">Dairy</option>
                                </select>
                            </div>
                            <Button
                                variant="primary"
                                onClick={() => window.location.href = '/share'}
                                icon={<i className="fas fa-plus"></i>}
                            >
                                Create Trade
                            </Button>
                        </div>

                        <div className="space-y-6">
                            {loading ? (
                                <div className="space-y-4">
                                    {[1, 2, 3].map((i) => (
                                        <div
                                            key={i}
                                            className="animate-pulse bg-gray-200 rounded-lg h-48"
                                        />
                                    ))}
                                </div>
                            ) : error ? (
                                <div className="text-center py-12">
                                    <i className="fas fa-exclamation-circle text-red-500 text-4xl mb-4"></i>
                                    <p className="text-gray-600">{error}</p>
                                    <Button
                                        variant="secondary"
                                        className="mt-4"
                                        onClick={loadTrades}
                                    >
                                        Try Again
                                    </Button>
                                </div>
                            ) : filteredTrades.length === 0 ? (
                                <div className="text-center py-12">
                                    <i className="fas fa-box-open text-gray-400 text-4xl mb-4"></i>
                                    <p className="text-gray-600">No trades found</p>
                                    <Button
                                        variant="primary"
                                        className="mt-4"
                                        onClick={() => window.location.href = '/share'}
                                    >
                                        Create Trade
                                    </Button>
                                </div>
                            ) : (
                                <TradeList
                                    trades={filteredTrades}
                                    onAccept={handleAccept}
                                    onDecline={handleDecline}
                                    onComplete={handleComplete}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('TradingHubPage error:', error);
        reportError(error);
        return null;
    }
}
