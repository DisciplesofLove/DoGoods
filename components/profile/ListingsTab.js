function ListingsTab({ listings, onEdit, onDelete }) {
    try {
        const [activeTab, setActiveTab] = React.useState('active');
        const [searchTerm, setSearchTerm] = React.useState('');

        const filteredListings = listings.filter(listing => {
            const matchesSearch = listing.title.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = activeTab === 'all' || listing.status === activeTab;
            return matchesSearch && matchesStatus;
        });

        return (
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex space-x-2">
                        <button
                            onClick={() => setActiveTab('active')}
                            className={`px-4 py-2 rounded-lg ${
                                activeTab === 'active' 
                                    ? 'bg-green-600 text-white' 
                                    : 'bg-gray-100 text-gray-600'
                            }`}
                        >
                            Active
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
                        placeholder="Search listings..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        icon={<i className="fas fa-search"></i>}
                        className="md:w-64"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredListings.map(listing => (
                        <Card key={listing.id} className="overflow-hidden">
                            <div className="aspect-w-16 aspect-h-9">
                                <img 
                                    src={listing.image} 
                                    alt={listing.title}
                                    className="w-full h-48 object-cover"
                                />
                            </div>
                            <div className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-lg font-semibold">{listing.title}</h3>
                                    <span className={`px-2 py-1 text-xs rounded-full ${
                                        listing.status === 'active' 
                                            ? 'bg-green-100 text-green-800' 
                                            : 'bg-gray-100 text-gray-800'
                                    }`}>
                                        {listing.status}
                                    </span>
                                </div>
                                <p className="text-gray-600 text-sm mb-4">{listing.description}</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500">
                                        {formatDate(listing.createdAt)}
                                    </span>
                                    <div className="flex space-x-2">
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
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {filteredListings.length === 0 && (
                    <div className="text-center py-12">
                        <i className="fas fa-box-open text-gray-400 text-4xl mb-4"></i>
                        <p className="text-gray-600">No listings found</p>
                        <Button
                            variant="primary"
                            className="mt-4"
                            onClick={() => window.location.href = '/share'}
                        >
                            Create Listing
                        </Button>
                    </div>
                )}
            </div>
        );
    } catch (error) {
        console.error('ListingsTab component error:', error);
        reportError(error);
        return null;
    }
}
