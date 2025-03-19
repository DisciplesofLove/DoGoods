function HomePage() {
    try {
        const foodCategories = [
            {
                id: 'produce',
                title: 'Fruits',
                description: 'Fresh fruits and berries',
                image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
                itemCount: 67
            },
            {
                id: 'produce',
                title: 'Vegetables',
                description: 'Fresh and organic vegetables',
                image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
                itemCount: 45
            },
            {
                id: 'bakery',
                title: 'Bakery',
                description: 'Bread, pastries, and baked goods',
                image: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
                itemCount: 23
            },
            {
                id: 'dairy',
                title: 'Dairy & Eggs',
                description: 'Milk, cheese, eggs, and more',
                image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
                itemCount: 19
            },
            {
                id: 'pantry',
                title: 'Pantry Items',
                description: 'Non-perishable food items',
                image: 'https://images.unsplash.com/photo-1584473457406-6240486418e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
                itemCount: 34
            },
            {
                id: 'prepared',
                title: 'Prepared Meals',
                description: 'Home-cooked meals and leftovers',
                image: 'https://images.unsplash.com/photo-1594834749740-74b3f6764be4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
                itemCount: 28
            }
        ];

        const featuredListings = [
            {
                id: 1,
                title: 'Fresh Organic Vegetables',
                description: 'Surplus vegetables from our local farm including carrots, tomatoes, and lettuce.',
                image: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
                quantity: 5,
                unit: 'kg',
                location: 'Brooklyn, NY',
                donor: {
                    name: 'Green Farm Co-op',
                    avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
                },
                type: 'donation',
                status: 'expired',
                expiryDate: '2024-01-19'
            },
            {
                id: 2,
                title: 'Homemade Sourdough Bread',
                description: 'Freshly baked sourdough bread, perfect for sharing. Made with organic flour.',
                image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
                quantity: 3,
                unit: 'loaves',
                location: 'Manhattan, NY',
                donor: {
                    name: "Sarah's Bakery",
                    avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
                },
                type: 'trade',
                status: 'expired',
                expiryDate: '2024-01-17'
            },
            {
                id: 3,
                title: 'Organic Fruit Box',
                description: 'Mixed seasonal fruits including apples, oranges, and pears.',
                image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
                quantity: 4,
                unit: 'kg',
                location: 'Queens, NY',
                donor: {
                    name: 'Local Food Bank',
                    avatar: 'https://randomuser.me/api/portraits/men/3.jpg'
                },
                type: 'donation',
                status: 'expired',
                expiryDate: '2024-01-18'
            }
        ];

        const communities = [
            {
                id: 1,
                name: 'Brooklyn Food Sharing',
                description: 'A community of food sharers in Brooklyn. Join us to reduce food waste and help others!',
                members: 156,
                lastActive: '2024-01-15',
                image: 'https://images.unsplash.com/photo-1518398046578-8cca57782e17?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
            },
            {
                id: 2,
                name: 'Vegan Food Exchange',
                description: 'Exchange vegan food and share recipes with other plant-based food lovers.',
                members: 89,
                lastActive: '2024-01-15',
                image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
            },
            {
                id: 3,
                name: 'Home Gardeners Network',
                description: 'Connect with fellow gardeners to share your harvest and gardening tips.',
                members: 234,
                lastActive: '2024-01-15',
                image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
            }
        ];

        const impactStats = {
            foodSaved: 1876.5,
            peopleHelped: 4231,
            co2Prevented: 3753,
            waterSaved: 15640
        };

        const handleNavigation = (path) => {
            window.location.href = path;
        };

        return (
            <div data-name="home-page">
                {/* Hero Section */}
                <section className="hero-banner relative py-24">
                    <div className="hero-overlay"></div>
                    <div className="container mx-auto px-4 hero-content">
                        <div className="max-w-3xl">
                            <h1 className="text-4xl md:text-5xl font-bold mb-6">
                                Share Food, Reduce Waste, Build Community
                            </h1>
                            <p className="text-xl mb-8">
                                Join our movement to combat food waste and hunger through community-driven food sharing and trading.
                            </p>
                            <div className="flex space-x-4">
                                <button 
                                    className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                                    onClick={() => handleNavigation('/share')}
                                >
                                    Share Food
                                </button>
                                <button 
                                    className="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors"
                                    onClick={() => handleNavigation('/find')}
                                >
                                    Find Food
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Featured Listings Section */}
                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                Featured Listings
                            </h2>
                            <p className="text-xl text-gray-600">
                                Browse our latest food sharing opportunities
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            {featuredListings.map((listing) => (
                                <FoodCard
                                    key={listing.id}
                                    food={listing}
                                    onClaim={() => handleNavigation('/find')}
                                    onTrade={() => handleNavigation('/trading')}
                                />
                            ))}
                        </div>

                        <div className="text-center">
                            <Button
                                variant="primary"
                                onClick={() => handleNavigation('/find')}
                            >
                                View All Listings
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Categories Section */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                Browse by Category
                            </h2>
                            <p className="text-xl text-gray-600">
                                Discover food available for sharing in your area
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {foodCategories.map((category, index) => (
                                <CategoryCard
                                    key={index}
                                    category={category}
                                    onClick={() => handleNavigation(`/find?category=${category.id}`)}
                                />
                            ))}
                        </div>

                        <div className="text-center mt-8">
                            <button 
                                className="text-green-600 font-semibold hover:text-green-700 flex items-center mx-auto"
                                onClick={() => handleNavigation('/find')}
                            >
                                View all categories
                                <i className="fas fa-arrow-right ml-2"></i>
                            </button>
                        </div>
                    </div>
                </section>

                {/* How It Works Section */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                How It Works
                            </h2>
                            <p className="text-xl text-gray-600">
                                Join our community in three simple steps
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                {
                                    title: 'Find Food',
                                    description: 'Browse available food items in your area or search for specific items',
                                    icon: 'fa-search'
                                },
                                {
                                    title: 'Connect',
                                    description: 'Message the food sharer and arrange a pickup time and location',
                                    icon: 'fa-comments'
                                },
                                {
                                    title: 'Share & Save',
                                    description: 'Meet up, share food, and help reduce waste in your community',
                                    icon: 'fa-handshake'
                                }
                            ].map((step, index) => (
                                <div key={index} className="text-center">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <i className={`fas ${step.icon} text-2xl text-green-600`}></i>
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                                    <p className="text-gray-600">{step.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Communities Section */}
                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                Active Communities
                            </h2>
                            <p className="text-xl text-gray-600">
                                Join local food sharing groups in your area
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            {communities.map((community) => (
                                <Card
                                    key={community.id}
                                    className="overflow-hidden hover:shadow-lg transition-shadow"
                                >
                                    <img
                                        src={community.image}
                                        alt={community.name}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold mb-2">{community.name}</h3>
                                        <p className="text-gray-600 mb-4">{community.description}</p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-500">
                                                {community.members} members
                                            </span>
                                            <Button
                                                variant="primary"
                                                size="sm"
                                                onClick={() => handleNavigation('/community')}
                                            >
                                                Join Group
                                            </Button>
                                        </div>
                                        <div className="mt-2 text-sm text-gray-500">
                                            Active {formatDate(community.lastActive)}
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>

                        <div className="text-center">
                            <Button
                                variant="secondary"
                                onClick={() => handleNavigation('/community')}
                            >
                                View all communities
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Impact Section */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                Our Impact
                            </h2>
                            <p className="text-xl text-gray-600">
                                Together we're making a difference
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-green-600">{impactStats.foodSaved}kg</div>
                                <div className="text-gray-600">Food Saved</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-green-600">{impactStats.peopleHelped}</div>
                                <div className="text-gray-600">People Helped</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-green-600">{impactStats.co2Prevented}kg</div>
                                <div className="text-gray-600">CO2 Prevented</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-green-600">{impactStats.waterSaved}L</div>
                                <div className="text-gray-600">Water Saved</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="py-16 bg-green-600 text-white">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl font-bold mb-4">Ready to start sharing?</h2>
                        <p className="text-xl mb-8">Join our community today and make a difference</p>
                        <Button
                            variant="secondary"
                            size="lg"
                            onClick={() => handleNavigation('/signup')}
                        >
                            Sign Up Now
                        </Button>
                    </div>
                </section>
            </div>
        );
    } catch (error) {
        console.error('HomePage error:', error);
        reportError(error);
        return null;
    }
}
