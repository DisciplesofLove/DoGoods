function ShareFoodPage() {
    try {
        const [activeTab, setActiveTab] = React.useState('individual');
        const [loading, setLoading] = React.useState(false);
        const [initialData, setInitialData] = React.useState(null);
        const [isEditing, setIsEditing] = React.useState(false);

        React.useEffect(() => {
            // Check if we're editing an existing listing
            const urlParams = new URLSearchParams(window.location.search);
            const editId = urlParams.get('edit');
            
            if (editId) {
                loadListingForEdit(parseInt(editId));
            }
            
            // Initialize database
            db.init().catch(error => {
                console.error('Database initialization error:', error);
                alert('Failed to initialize database. Please try again.');
            });
        }, []);

        const loadListingForEdit = async (listingId) => {
            setLoading(true);
            try {
                const listing = await db.get(db.STORES.listings, listingId);
                if (listing) {
                    setInitialData(listing);
                    setIsEditing(true);
                }
            } catch (error) {
                console.error('Load listing error:', error);
                alert('Failed to load listing for editing. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        const handleSubmit = async (formData) => {
            setLoading(true);
            try {
                const currentUser = JSON.parse(localStorage.getItem('currentUser'));
                if (!currentUser || !currentUser.id) {
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

                // Redirect to profile page
                window.location.href = '/profile';
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
                if (!currentUser || !currentUser.id) {
                    throw new Error('User not authenticated');
                }

                // Process CSV data (in a real app, this would parse the CSV file)
                const bulkItems = [
                    {
                        title: 'Bulk Item 1',
                        description: 'Description for bulk item 1',
                        quantity: 5,
                        unit: 'kg',
                        expiryDate: '2024-03-01',
                        category: 'produce',
                        type: formData.defaultType,
                        location: formData.location
                    },
                    {
                        title: 'Bulk Item 2',
                        description: 'Description for bulk item 2',
                        quantity: 3,
                        unit: 'kg',
                        expiryDate: '2024-03-05',
                        category: 'bakery',
                        type: formData.defaultType,
                        location: formData.location
                    }
                ];

                // Save each bulk item
                for (const item of bulkItems) {
                    await db.add(db.STORES.listings, {
                        ...item,
                        userId: parseInt(currentUser.id),
                        status: 'active',
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString()
                    });
                }

                alert('Bulk upload successful! Your listings have been added.');
                window.location.href = '/profile';
            } catch (error) {
                console.error('Bulk upload error:', error);
                alert('Failed to process bulk upload. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        return (
            <div data-name="share-food-page" className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">{isEditing ? 'Edit Listing' : 'Share Food'}</h1>
                    <p className="mt-2 text-gray-600">
                        {isEditing 
                            ? 'Update your food listing information' 
                            : 'List your surplus food for donation or trade with the community.'}
                    </p>
                </div>

                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    {!isEditing && (
                        <div className="border-b border-gray-200">
                            <nav className="flex">
                                <button
                                    onClick={() => setActiveTab('individual')}
                                    className={`px-4 py-4 text-center w-1/2 font-medium text-sm border-b-2 ${
                                        activeTab === 'individual'
                                            ? 'border-green-500 text-green-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                >
                                    <i className="fas fa-box mr-2"></i>
                                    Individual Item
                                </button>
                                <button
                                    onClick={() => setActiveTab('bulk')}
                                    className={`px-4 py-4 text-center w-1/2 font-medium text-sm border-b-2 ${
                                        activeTab === 'bulk'
                                            ? 'border-green-500 text-green-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                >
                                    <i className="fas fa-boxes mr-2"></i>
                                    Bulk Upload
                                </button>
                            </nav>
                        </div>
                    )}

                    <div className="p-6">
                        {isEditing || activeTab === 'individual' ? (
                            <FoodForm
                                initialData={initialData}
                                onSubmit={handleSubmit}
                                loading={loading}
                            />
                        ) : (
                            <BulkUploadForm
                                onSubmit={handleBulkSubmit}
                                loading={loading}
                            />
                        )}
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('ShareFoodPage error:', error);
        reportError(error);
        return null;
    }
}
