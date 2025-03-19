function UserStore({
    user,
    listings,
    onEdit,
    onDelete,
    loading = false,
    error = null
}) {
    try {
        const [activeTab, setActiveTab] = React.useState('active');

        const filteredListings = listings?.filter(listing => {
            if (activeTab === 'active') return listing.status === 'available';
            if (activeTab === 'completed') return listing.status === 'completed';
            return listing.status === 'expired';
        });

        return (
            <div data-name="user-store" className="bg-white rounded-lg shadow-sm">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">My Store</h2>
                        <Button
                            variant="primary"
                            icon={<i className="fas fa-plus"></i>}
                            onClick={() => window.location.href = '/share'}
                        >
                            New Listing
                        </Button>
                    </div>

                    <div className="border-b mb-6">
                        <nav className="flex space-x-8">
                            {['active', 'completed', 'expired'].map((tab) => (
                                <button
                                    key={tab}
                                    className={`
                                        py-4 px-1 border-b-2 font-medium text-sm
                                        ${activeTab === tab ?
                                            'border-green-500 text-green-600' :
                                            'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }
                                    `}
                                    onClick={() => setActiveTab(tab)}
                                >
                                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                </button>
                            ))}
                        </nav>
                    </div>

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
                        <div className="text-center py-8">
                            <i className="fas fa-exclamation-circle text-red-500 text-4xl mb-4"></i>
                            <p className="text-gray-600">{error}</p>
                            <Button
                                variant="secondary"
                                className="mt-4"
                                onClick={() => window.location.reload()}
                            >
                                Try Again
                            </Button>
                        </div>
                    ) : !filteredListings?.length ? (
                        <div className="text-center py-8">
                            <i className="fas fa-store text-gray-400 text-4xl mb-4"></i>
                            <p className="text-gray-600">No {activeTab} listings found</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredListings.map((listing) => (
                                <FoodCard
                                    key={listing.objectId}
                                    food={listing}
                                    footer={
                                        <div className="flex justify-end space-x-2">
                                            <Button
                                                variant="secondary"
                                                size="sm"
                                                icon={<i className="fas fa-edit"></i>}
                                                onClick={() => onEdit(listing)}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                icon={<i className="fas fa-trash"></i>}
                                                onClick={() => onDelete(listing)}
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    }
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
    } catch (error) {
        console.error('UserStore component error:', error);
        reportError(error);
        return null;
    }
}
