function FindFoodPage({ initialCategory }) {
    try {
        const [foods, setFoods] = React.useState([]);
        const [loading, setLoading] = React.useState(true);
        const [error, setError] = React.useState(null);
        const [searchTerm, setSearchTerm] = React.useState('');
        const [filters, setFilters] = React.useState({
            category: '',
            type: 'all',
            distance: 10
        });

        // Category mapping for display
        const categoryMapping = {
            fruits: 'produce',
            vegetables: 'produce',
            produce: 'produce',
            dairy: 'dairy',
            bakery: 'bakery',
            pantry: 'pantry',
            meat: 'meat',
            prepared: 'prepared'
        };

        React.useEffect(() => {
            const urlParams = new URLSearchParams(window.location.search);
            const categoryParam = urlParams.get('category');
            
            // Map the category if needed and set the filter
            if (categoryParam) {
                const mappedCategory = categoryMapping[categoryParam.toLowerCase()] || categoryParam;
                setFilters(prev => ({
                    ...prev,
                    category: mappedCategory
                }));
            }
            
            loadFoods();
        }, [window.location.search]);

        const loadFoods = async () => {
            setLoading(true);
            try {
                await db.init();
                const listings = await db.getAll(db.STORES.listings);
                const activeListings = listings.filter(listing => listing.status === 'active');
                
                const formattedListings = activeListings.map(listing => ({
                    objectId: listing.id.toString(),
                    title: listing.title,
                    description: listing.description,
                    image: listing.image || `https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60`,
                    quantity: listing.quantity,
                    unit: listing.unit,
                    expiryDate: listing.expiryDate,
                    location: listing.location,
                    category: listing.category,
                    type: listing.type,
                    donor: {
                        name: "Food Donor",
                        avatar: "https://randomuser.me/api/portraits/men/1.jpg"
                    }
                }));
                
                setFoods(formattedListings);
                setLoading(false);
            } catch (error) {
                console.error('Load foods error:', error);
                setError('Failed to load food listings. Please try again.');
                setLoading(false);
            }
        };

        const handleClaim = async (food) => {
            try {
                const isAuthenticated = localStorage.getItem('userAuthenticated') === 'true';
                if (!isAuthenticated) {
                    alert('Please log in to claim this food item.');
                    window.location.href = '/login';
                    return;
                }
                
                // In a real app, this would call an API to claim the food item
                await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
                
                alert(`Successfully claimed: ${food.title}`);
                await loadFoods(); // Refresh the list
            } catch (error) {
                console.error('Claim food error:', error);
                alert('Failed to claim food. Please try again.');
            }
        };

        const handleTrade = async (food) => {
            try {
                const isAuthenticated = localStorage.getItem('userAuthenticated') === 'true';
                if (!isAuthenticated) {
                    alert('Please log in to trade for this food item.');
                    window.location.href = '/login';
                    return;
                }
                
                // In a real app, this would navigate to the trade page
                window.location.href = `/trading?item=${food.objectId}`;
            } catch (error) {
                console.error('Trade initiation error:', error);
                alert('Failed to initiate trade. Please try again.');
            }
        };

        const handleFilterChange = (e) => {
            const { name, value } = e.target;
            setFilters(prev => ({
                ...prev,
                [name]: value
            }));
            
            // Update URL when category changes
            if (name === 'category') {
                const newUrl = value 
                    ? `${window.location.pathname}?category=${value}`
                    : window.location.pathname;
                window.history.pushState({}, '', newUrl);
            }
        };

        const filteredFoods = React.useMemo(() => {
            let result = [...foods];

            if (searchTerm) {
                result = result.filter(food => 
                    food.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    food.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    food.location.toLowerCase().includes(searchTerm.toLowerCase())
                );
            }

            if (filters.category) {
                result = result.filter(food => food.category === filters.category);
            }

            if (filters.type !== 'all') {
                result = result.filter(food => food.type === filters.type);
            }

            return result;
        }, [foods, searchTerm, filters]);

        if (loading) {
            return (
                <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading food listings...</p>
                </div>
            );
        }

        if (error) {
            return (
                <div className="text-center py-12">
                    <i className="fas fa-exclamation-circle text-red-500 text-4xl mb-4"></i>
                    <p className="text-gray-600">{error}</p>
                    <Button
                        variant="secondary"
                        className="mt-4"
                        onClick={loadFoods}
                    >
                        Try Again
                    </Button>
                </div>
            );
        }

        return (
            <div data-name="find-food-page">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Find Food</h1>
                    <p className="mt-2 text-gray-600">
                        Browse available food donations and trades in your area.
                    </p>
                </div>

                <div className="mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="md:col-span-2">
                            <Input
                                placeholder="Search foods..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                icon={<i className="fas fa-search"></i>}
                            />
                        </div>

                        <Input
                            type="select"
                            name="category"
                            value={filters.category}
                            onChange={handleFilterChange}
                            options={[
                                { value: '', label: 'All Categories' },
                                { value: 'produce', label: 'Fresh Produce' },
                                { value: 'dairy', label: 'Dairy' },
                                { value: 'bakery', label: 'Bakery' },
                                { value: 'pantry', label: 'Pantry Items' },
                                { value: 'meat', label: 'Meat & Poultry' },
                                { value: 'prepared', label: 'Prepared Foods' }
                            ]}
                        />

                        <Input
                            type="select"
                            name="type"
                            value={filters.type}
                            onChange={handleFilterChange}
                            options={[
                                { value: 'all', label: 'All Types' },
                                { value: 'donation', label: 'Donations' },
                                { value: 'trade', label: 'Trades' }
                            ]}
                        />
                    </div>
                </div>

                {filteredFoods.length === 0 ? (
                    <div className="text-center py-12">
                        <i className="fas fa-search text-gray-400 text-4xl mb-4"></i>
                        <p className="text-gray-600 mb-4">No food listings found</p>
                        <Button
                            variant="secondary"
                            onClick={() => {
                                setSearchTerm('');
                                setFilters({
                                    category: '',
                                    type: 'all',
                                    distance: 10
                                });
                            }}
                        >
                            Clear Filters
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredFoods.map((food) => (
                            <FoodCard
                                key={food.objectId}
                                food={food}
                                onClaim={handleClaim}
                                onTrade={handleTrade}
                            />
                        ))}
                    </div>
                )}
            </div>
        );
    } catch (error) {
        console.error('FindFoodPage error:', error);
        reportError(error);
        return null;
    }
}
