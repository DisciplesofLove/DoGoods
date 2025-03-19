function UserListings() {
    try {
        const [activeTab, setActiveTab] = React.useState('individual');
        const [loading, setLoading] = React.useState(false);
        const [initialData, setInitialData] = React.useState(null);
        const [isEditing, setIsEditing] = React.useState(false);
        const [listings, setListings] = React.useState([]);

        React.useEffect(() => {
            // Initialize database
            db.init().then(() => {
                loadListings();
            }).catch(error => {
                console.error('Database initialization error:', error);
                alert('Failed to initialize database. Please try again.');
            });
        }, []);

        const loadListings = async () => {
            try {
                const currentUser = JSON.parse(localStorage.getItem('currentUser'));
                if (!currentUser) {
                    throw new Error('User not found');
                }

                const allListings = await db.getAll(db.STORES.listings);
                const userListings = allListings.filter(listing => listing.userId === parseInt(currentUser.id));
                setListings(userListings);
            } catch (error) {
                console.error('Load listings error:', error);
                alert('Failed to load listings');
            }
        };

        const handleSubmit = async (formData) => {
            setLoading(true);
            try {
                const currentUser = JSON.parse(localStorage.getItem('currentUser'));
                if (!currentUser) {
                    throw new Error('User not authenticated');
                }

                const listingData = {
                    ...formData,
                    userId: parseInt(currentUser.id),
                    status: 'active',
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                };

                if (isEditing && initialData) {
                    // Update existing listing
                    await db.update(db.STORES.listings, initialData.id, {
                        ...listingData,
                        id: initialData.id
                    });
                    alert('Listing updated successfully!');
                } else {
                    // Create new listing
                    await db.add(db.STORES.listings, listingData);
                    alert('Listing created successfully!');
                }

                await loadListings();
                setActiveTab('listings');
            } catch (error) {
                console.error('Create/update listing error:', error);
                alert('Failed to save listing. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        const handleBulkSubmit = async (formData) => {
            setLoading(true);
            try {
                const currentUser = JSON.parse(localStorage.getItem('currentUser'));
                if (!currentUser) {
                    throw new Error('User not authenticated');
                }

                const file = formData.csvFile;
                const reader = new FileReader();
                
                reader.onload = async (e) => {
                    try {
                        const text = e.target.result;
                        const rows = text.split('\n');
                        const headers = rows[0].split(',').map(h => h.trim());
                        
                        const listings = rows.slice(1)
                            .filter(row => row.trim().length > 0)
                            .map(row => {
                                const values = row.split(',').map(v => v.trim());
                                const listing = {};
                                headers.forEach((header, index) => {
                                    listing[header] = values[index];
                                });
                                return {
                                    ...listing,
                                    userId: parseInt(currentUser.id),
                                    status: 'active',
                                    type: formData.defaultType,
                                    location: formData.location,
                                    createdAt: new Date().toISOString(),
                                    updatedAt: new Date().toISOString()
                                };
                            });

                        // Save all listings
                        for (const listing of listings) {
                            await db.add(db.STORES.listings, listing);
                        }

                        alert(`Successfully uploaded ${listings.length} listings!`);
                        await loadListings();
                        setActiveTab('listings');
                    } catch (error) {
                        console.error('Parse CSV error:', error);
                        alert('Failed to parse CSV file. Please check the format.');
                    }
                };

                reader.readAsText(file);
            } catch (error) {
                console.error('Bulk upload error:', error);
                alert('Failed to process bulk upload. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        const handleEdit = (listing) => {
            setInitialData(listing);
            setIsEditing(true);
            setActiveTab('individual');
        };

        const handleDelete = async (listing) => {
            if (!confirm('Are you sure you want to delete this listing?')) return;

            try {
                await db.delete(db.STORES.listings, listing.id);
                await loadListings();
                alert('Listing deleted successfully');
            } catch (error) {
                console.error('Delete listing error:', error);
                alert('Failed to delete listing. Please try again.');
            }
        };

        const downloadTemplate = () => {
            const csvContent = "title,description,quantity,unit,expiryDate,category\nOrganic Apples,Fresh locally grown apples,5,kg,2024-12-31,produce\nSourdough Bread,Freshly baked this morning,2,loaves,2024-12-25,bakery";
            const blob = new Blob([csvContent], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'food_listings_template.csv';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        };

        return (
            <div className="max-w-7xl mx-auto py-8 px-4">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">My Listings</h1>
                    <p className="text-gray-600">Manage your food listings and track their status</p>
                </div>

                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="border-b border-gray-200">
                        <nav className="flex">
                            <button
                                onClick={() => setActiveTab('listings')}
                                className={`px-4 py-4 text-center w-1/3 font-medium text-sm border-b-2 ${
                                    activeTab === 'listings'
                                        ? 'border-green-500 text-green-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                <i className="fas fa-list mr-2"></i>
                                My Listings
                            </button>
                            <button
                                onClick={() => {
                                    setIsEditing(false);
                                    setInitialData(null);
                                    setActiveTab('individual');
                                }}
                                className={`px-4 py-4 text-center w-1/3 font-medium text-sm border-b-2 ${
                                    activeTab === 'individual'
                                        ? 'border-green-500 text-green-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                <i className="fas fa-plus mr-2"></i>
                                Add Individual Listing
                            </button>
                            <button
                                onClick={() => setActiveTab('bulk')}
                                className={`px-4 py-4 text-center w-1/3 font-medium text-sm border-b-2 ${
                                    activeTab === 'bulk'
                                        ? 'border-green-500 text-green-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                <i className="fas fa-upload mr-2"></i>
                                Bulk Upload
                            </button>
                        </nav>
                    </div>

                    <div className="p-6">
                        {activeTab === 'listings' && (
                            <div className="space-y-6">
                                {listings.length === 0 ? (
                                    <div className="text-center py-12">
                                        <i className="fas fa-box-open text-gray-400 text-4xl mb-4"></i>
                                        <p className="text-gray-600 mb-4">You haven't created any listings yet</p>
                                        <Button
                                            variant="primary"
                                            onClick={() => setActiveTab('individual')}
                                        >
                                            Create Your First Listing
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {listings.map(listing => (
                                            <Card key={listing.id} className="overflow-hidden">
                                                {listing.image && (
                                                    <img
                                                        src={listing.image}
                                                        alt={listing.title}
                                                        className="w-full h-48 object-cover"
                                                    />
                                                )}
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
                                                                onClick={() => handleEdit(listing)}
                                                            >
                                                                Edit
                                                            </Button>
                                                            <Button
                                                                variant="danger"
                                                                size="sm"
                                                                onClick={() => handleDelete(listing)}
                                                            >
                                                                Delete
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Card>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'individual' && (
                            <FoodForm
                                initialData={initialData}
                                onSubmit={handleSubmit}
                                loading={loading}
                            />
                        )}

                        {activeTab === 'bulk' && (
                            <div>
                                <div className="bg-blue-50 rounded-lg p-4 mb-6">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 pt-0.5">
                                            <i className="fas fa-info-circle text-blue-500"></i>
                                        </div>
                                        <div className="ml-3">
                                            <h3 className="text-sm font-medium text-blue-800">Bulk Upload Instructions</h3>
                                            <div className="mt-2 text-sm text-blue-700">
                                                <p>Upload multiple food items at once using our CSV template.</p>
                                                <button 
                                                    type="button"
                                                    onClick={downloadTemplate}
                                                    className="mt-2 text-blue-600 hover:text-blue-800 font-medium flex items-center"
                                                >
                                                    <i className="fas fa-download mr-1"></i>
                                                    Download CSV Template
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <BulkUploadForm
                                    onSubmit={handleBulkSubmit}
                                    loading={loading}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('UserListings error:', error);
        reportError(error);
        return null;
    }
}
