function TradeCard({
    trade,
    onAccept,
    onDecline,
    onComplete,
    className = ''
}) {
    try {
        const {
            objectId,
            offeredItem,
            requestedItem,
            requestedItems = [], // Support for multiple requested items
            status,
            createdAt,
            user
        } = trade;

        // Use requestedItems array if available, otherwise create an array from the single requestedItem
        const itemsRequested = requestedItems.length > 0 ? requestedItems : (requestedItem ? [requestedItem] : []);

        // High quality images for specific food items
        const foodImages = {
            eggs: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", // Fresh eggs in basket
            herbs: "https://images.unsplash.com/photo-1600231915711-b9d1e8a8a26e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", // Fresh herbs close-up
            vegetables: "https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", // Fresh vegetables
            fruits: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", // Fresh fruits
            bread: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", // Fresh bread
            dairy: "https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"  // Dairy products
        };

        // Get appropriate image based on item title
        const getItemImage = (item) => {
            if (item.image) return item.image;
            
            const title = item.title.toLowerCase();
            if (title.includes('egg')) return foodImages.eggs;
            if (title.includes('herb')) return foodImages.herbs;
            if (title.includes('vegetable')) return foodImages.vegetables;
            if (title.includes('fruit')) return foodImages.fruits;
            if (title.includes('bread') || title.includes('loaf') || title.includes('baked')) return foodImages.bread;
            if (title.includes('dairy') || title.includes('milk') || title.includes('cheese')) return foodImages.dairy;
            
            // Default fallback images if no specific match
            return Object.values(foodImages)[Math.floor(Math.random() * Object.values(foodImages).length)];
        };

        const statusColors = {
            pending: 'bg-yellow-100 text-yellow-800',
            accepted: 'bg-green-100 text-green-800',
            declined: 'bg-red-100 text-red-800',
            completed: 'bg-blue-100 text-blue-800'
        };

        return (
            <Card
                className={`trade-card ${className}`}
                title={`Trade Request #${objectId.slice(-6)}`}
                subtitle={
                    <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-sm ${statusColors[status]}`}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                        </span>
                        <span className="text-gray-500">
                            {timeAgo(createdAt)}
                        </span>
                    </div>
                }
                footer={
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Avatar src={user.avatar} size="sm" />
                            <span className="text-sm text-gray-600">{user.name}</span>
                        </div>
                        {status === 'pending' && (
                            <div className="flex space-x-2">
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => onDecline(trade)}
                                >
                                    Decline
                                </Button>
                                <Button
                                    variant="primary"
                                    size="sm"
                                    onClick={() => onAccept(trade)}
                                >
                                    Accept
                                </Button>
                            </div>
                        )}
                        {status === 'accepted' && (
                            <Button
                                variant="primary"
                                size="sm"
                                onClick={() => onComplete(trade)}
                            >
                                Complete Trade
                            </Button>
                        )}
                    </div>
                }
            >
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="w-5/12">
                            <h4 className="font-medium text-gray-900">Offering</h4>
                            <div className="mt-2">
                                {offeredItem.image ? (
                                    <img 
                                        src={offeredItem.image} 
                                        alt={offeredItem.title}
                                        className="w-full h-40 object-cover rounded-lg"
                                    />
                                ) : (
                                    <img 
                                        src={getItemImage(offeredItem)}
                                        alt={offeredItem.title}
                                        className="w-full h-40 object-cover rounded-lg"
                                    />
                                )}
                            </div>
                            <p className="mt-2 text-gray-600">{offeredItem.title}</p>
                            <p className="text-sm text-gray-500">
                                {offeredItem.quantity} {offeredItem.unit}
                            </p>
                        </div>
                        <i className="fas fa-exchange-alt text-gray-400 mx-4"></i>
                        <div className="w-5/12">
                            <h4 className="font-medium text-gray-900">Requesting</h4>
                            <div className="mt-2 space-y-3">
                                {itemsRequested.length > 0 ? (
                                    <div className="grid grid-cols-2 gap-2">
                                        {itemsRequested.map((item, index) => (
                                            <div key={index} className="space-y-1">
                                                <div className="w-full">
                                                    <img 
                                                        src={getItemImage(item)}
                                                        alt={item.title}
                                                        className="w-full h-20 object-cover rounded-lg"
                                                    />
                                                </div>
                                                <p className="text-xs text-gray-600 truncate">{item.title}</p>
                                                <p className="text-xs text-gray-500">
                                                    {item.quantity} {item.unit}
                                                </p>
                                            </div>
                                        ))}
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
                    </div>

                    {trade.message && (
                        <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-sm text-gray-600">{trade.message}</p>
                        </div>
                    )}
                </div>
            </Card>
        );
    } catch (error) {
        console.error('TradeCard component error:', error);
        reportError(error);
        return null;
    }
}
