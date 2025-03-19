function TradesTab({ trades = [], onAccept, onDecline, onComplete }) {
    try {
        const [activeTab, setActiveTab] = React.useState('pending');
        const [searchTerm, setSearchTerm] = React.useState('');

        // Update the mock trades with multiple requested items and improved images
        const mockTrades = [
            {
                objectId: 'trade-1',
                offeredItem: {
                    title: 'Fresh Vegetables',
                    quantity: 3,
                    unit: 'kg',
                    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
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
                    }
                ],
                status: 'pending',
                createdAt: '2024-01-15T12:00:00Z',
                user: {
                    name: 'John Smith',
                    avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
                },
                message: 'Looking to trade my fresh vegetables for homemade bread or eggs.'
            },
            {
                objectId: 'trade-2',
                offeredItem: {
                    title: 'Homemade Jam',
                    quantity: 3,
                    unit: 'jars',
                    image: 'https://images.unsplash.com/photo-1563822249366-3efb23b8e0c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
                },
                requestedItems: [
                    {
                        title: 'Fresh Fruits',
                        quantity: 2,
                        unit: 'kg',
                        image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
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
                message: 'Would like to trade my homemade jam for fresh fruits or honey.'
            },
            {
                objectId: 'trade-3',
                offeredItem: {
                    title: 'Fresh Eggs',
                    quantity: 12,
                    unit: 'eggs',
                    image: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
                },
                requestedItems: [
                    {
                        title: 'Vegetables',
                        quantity: 2,
                        unit: 'kg',
                        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
                    },
                    {
                        title: 'Herbs',
                        quantity: 2,
                        unit: 'bunches',
                        image: 'https://images.unsplash.com/photo-1600231915711-b9d1e8a8a26e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
                    },
                    {
                        title: 'Dairy Products',
                        quantity: 1,
                        unit: 'pack',
                        image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
                    }
                ],
                status: 'completed',
                createdAt: '2024-01-13T14:15:00Z',
                user: {
                    name: 'Michael Lee',
                    avatar: 'https://randomuser.me/api/portraits/men/3.jpg'
                },
                message: 'Trading farm fresh eggs for vegetables, herbs, or dairy products.'
            }
        ];

        // Use provided trades or fallback to mock trades if empty
        const displayTrades = trades && trades.length > 0 ? trades : mockTrades;

        const filteredTrades = displayTrades.filter(trade => {
            // Check if any of the offered or requested items match the search term
            const offeredItemMatch = (trade.offeredItem?.title || '').toLowerCase().includes(searchTerm.toLowerCase());
            
            // Check in requested items (single item or array)
            let requestedItemsMatch = false;
            
            if (trade.requestedItems && trade.requestedItems.length > 0) {
                requestedItemsMatch = trade.requestedItems.some(item => 
                    (item.title || '').toLowerCase().includes(searchTerm.toLowerCase())
                );
            } else if (trade.requestedItem) {
                requestedItemsMatch = (trade.requestedItem.title || '').toLowerCase().includes(searchTerm.toLowerCase());
            }
            
            const matchesSearch = offeredItemMatch || requestedItemsMatch;
            const matchesStatus = activeTab === 'all' || trade.status === activeTab;
            
            return matchesSearch && matchesStatus;
        });

        return (
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex space-x-2">
                        <button
                            onClick={() => setActiveTab('pending')}
                            className={`px-4 py-2 rounded-lg ${
                                activeTab === 'pending' 
                                    ? 'bg-green-600 text-white' 
                                    : 'bg-gray-100 text-gray-600'
                            }`}
                        >
                            Pending
                        </button>
                        <button
                            onClick={() => setActiveTab('accepted')}
                            className={`px-4 py-2 rounded-lg ${
                                activeTab === 'accepted' 
                                    ? 'bg-green-600 text-white' 
                                    : 'bg-gray-100 text-gray-600'
                            }`}
                        >
                            Accepted
                        </button>
                        <button
                            onClick={() => setActiveTab('completed')}
                            className={`px-4 py-2 rounded-lg ${
                                activeTab === 'completed' 
                                    ? 'bg-green-600 text-white' 
                                    : 'bg-gray-100 text-gray-600'
                            }`}
                        >
                            Completed
                        </button>
                        <button
                            onClick={() => setActiveTab('all')}
                            className={`px-4 py-2 rounded-lg ${
                                activeTab === 'all' 
                                    ? 'bg-green-600 text-white' 
                                    : 'bg-gray-100 text-gray-600'
                            }`}
                        >
                            All
                        </button>
                    </div>
                    <Input
                        placeholder="Search trades..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        icon={<i className="fas fa-search"></i>}
                        className="md:w-64"
                    />
                </div>

                <div className="space-y-6">
                    {filteredTrades.map(trade => (
                        <Card key={trade.objectId || trade.id}>
                            <div className="p-6">
                                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
                                    <div className="flex items-center">
                                        <Avatar 
                                            src={trade.user?.avatar || 'https://via.placeholder.com/40'} 
                                            size="md" 
                                        />
                                        <div className="ml-4">
                                            <h3 className="font-medium">{trade.user?.name || 'Anonymous User'}</h3>
                                            <p className="text-sm text-gray-500">{timeAgo(trade.createdAt)}</p>
                                        </div>
                                    </div>
                                    <span className={`mt-2 md:mt-0 px-3 py-1 rounded-full text-sm font-medium ${
                                        trade.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                        trade.status === 'accepted' ? 'bg-blue-100 text-blue-800' :
                                        trade.status === 'completed' ? 'bg-green-100 text-green-800' :
                                        'bg-red-100 text-red-800'
                                    }`}>
                                        {trade.status ? trade.status.charAt(0).toUpperCase() + trade.status.slice(1) : 'Unknown'}
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h4 className="font-medium text-gray-900 mb-2">Offering</h4>
                                        {trade.offeredItem?.image && (
                                            <img 
                                                src={trade.offeredItem.image}
                                                alt={trade.offeredItem.title || 'Offered item'}
                                                className="w-full h-40 object-cover rounded-lg mb-3"
                                            />
                                        )}
                                        <p className="text-gray-900">{trade.offeredItem?.title || 'No title'}</p>
                                        <p className="text-sm text-gray-600">
                                            {trade.offeredItem?.quantity || 0} {trade.offeredItem?.unit || 'units'}
                                        </p>
                                    </div>

                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h4 className="font-medium text-gray-900 mb-2">Requesting</h4>
                                        {trade.requestedItems && trade.requestedItems.length > 0 ? (
                                            <div className="grid grid-cols-2 gap-2">
                                                {trade.requestedItems.map((item, index) => (
                                                    <div key={index} className="space-y-1">
                                                        <div className="w-full">
                                                            {item.image ? (
                                                                <img 
                                                                    src={item.image}
                                                                    alt={item.title}
                                                                    className="w-full h-16 object-cover rounded-lg"
                                                                />
                                                            ) : (
                                                                <div className="h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                                                                    <i className="fas fa-image text-gray-400"></i>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <p className="text-xs text-gray-900 truncate">{item.title}</p>
                                                        <p className="text-xs text-gray-600">
                                                            {item.quantity} {item.unit}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : trade.requestedItem ? (
                                            <div>
                                                {trade.requestedItem.image ? (
                                                    <img 
                                                        src={trade.requestedItem.image}
                                                        alt={trade.requestedItem.title || 'Requested item'}
                                                        className="w-full h-40 object-cover rounded-lg mb-3"
                                                    />
                                                ) : (
                                                    <div className="h-40 bg-gray-200 rounded-lg flex items-center justify-center mb-3">
                                                        <i className="fas fa-image text-gray-400"></i>
                                                    </div>
                                                )}
                                                <p className="text-gray-900">{trade.requestedItem.title || 'No title'}</p>
                                                <p className="text-sm text-gray-600">
                                                    {trade.requestedItem.quantity || 0} {trade.requestedItem.unit || 'units'}
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-center h-40 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                                                <div className="text-center">
                                                    <i className="fas fa-search text-gray-400 text-2xl mb-2"></i>
                                                    <p className="text-sm text-gray-500">Looking for items</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {trade.message && (
                                    <div className="bg-gray-50 p-4 rounded-lg mb-6">
                                        <p className="text-gray-700">{trade.message}</p>
                                    </div>
                                )}

                                <div className="flex justify-end space-x-3">
                                    {trade.status === 'pending' && (
                                        <React.Fragment>
                                            <Button
                                                variant="danger"
                                                onClick={() => onDecline && onDecline(trade)}
                                            >
                                                Decline
                                            </Button>
                                            <Button
                                                variant="primary"
                                                onClick={() => onAccept && onAccept(trade)}
                                            >
                                                Accept
                                            </Button>
                                        </React.Fragment>
                                    )}
                                    
                                    {trade.status === 'accepted' && (
                                        <Button
                                            variant="primary"
                                            onClick={() => onComplete && onComplete(trade)}
                                        >
                                            Mark as Completed
                                        </Button>
                                    )}
                                    
                                    {trade.status === 'completed' && (
                                        <div className="flex items-center text-green-600">
                                            <i className="fas fa-check-circle mr-2"></i>
                                            Trade Completed
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Card>
                    ))}

                    {filteredTrades.length === 0 && (
                        <div className="text-center py-12">
                            <i className="fas fa-handshake text-gray-400 text-4xl mb-4"></i>
                            <p className="text-gray-600">No trades found</p>
                            <Button
                                variant="primary"
                                className="mt-4"
                                onClick={() => window.location.href = '/trading'}
                            >
                                Start Trading
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        );
    } catch (error) {
        console.error('TradesTab component error:', error);
        reportError(error);
        return null;
    }
}
