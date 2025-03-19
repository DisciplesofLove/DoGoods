// User API
async function getCurrentUser() {
    try {
        // In a real app, this would be a fetch to your backend
        // For demo purposes, we'll return mock data
        return {
            objectId: 'user1',
            name: 'John Doe',
            email: 'john@example.com',
            avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
            phone: '555-123-4567',
            organization: 'Community Garden',
            bio: 'Food enthusiast and community organizer passionate about reducing food waste.',
            location: 'Brooklyn, NY',
            stats: {
                donations: 15,
                trades: 8,
                impact: 45
            },
            badges: [
                {
                    id: 'badge1',
                    name: 'Food Hero',
                    description: 'Donated 10+ food items',
                    icon: 'medal'
                },
                {
                    id: 'badge2',
                    name: 'Eco Warrior',
                    description: 'Saved 20kg of food waste',
                    icon: 'leaf'
                }
            ]
        };
    } catch (error) {
        console.error('Get current user error:', error);
        throw new Error('Unable to fetch user data');
    }
}

async function updateUserProfile(userData) {
    try {
        // In a real app, this would be a fetch to your backend
        // For demo purposes, we'll just return the data
        return userData;
    } catch (error) {
        console.error('Update user profile error:', error);
        throw new Error('Unable to update profile');
    }
}

// Food Listings API
async function createFoodListing(listingData) {
    try {
        // In a real app, this would be a fetch to your backend
        // For demo purposes, we'll just return the data with an ID
        return {
            ...listingData,
            objectId: `listing-${Date.now()}`,
            createdAt: new Date().toISOString()
        };
    } catch (error) {
        console.error('Create food listing error:', error);
        throw new Error('Unable to create listing');
    }
}

async function updateFoodListing(listingId, listingData) {
    try {
        // In a real app, this would be a fetch to your backend
        // For demo purposes, we'll just return the updated data
        return {
            ...listingData,
            objectId: listingId,
            updatedAt: new Date().toISOString()
        };
    } catch (error) {
        console.error('Update food listing error:', error);
        throw new Error('Unable to update listing');
    }
}

async function getFoodListing(listingId) {
    try {
        // In a real app, this would be a fetch to your backend
        // For demo purposes, we'll return mock data
        return {
            objectId: listingId,
            title: 'Fresh Organic Vegetables',
            description: 'Surplus vegetables from our local farm.',
            image: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
            quantity: 5,
            unit: 'kg',
            expiryDate: '2024-01-20',
            location: 'Brooklyn, NY',
            category: 'produce',
            type: 'donation',
            createdAt: '2024-01-01T12:00:00Z',
            donor: {
                name: 'Green Farm Co-op',
                avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
            }
        };
    } catch (error) {
        console.error('Get food listing error:', error);
        throw new Error('Unable to fetch listing');
    }
}

async function listFoodListings(params = {}) {
    try {
        // In a real app, this would be a fetch to your backend
        // For demo purposes, we'll return mock data
        const { limit = 20, descent = true, nextPageToken } = params;
        
        // Try to get mock listings from localStorage if available
        let mockListings = [];
        try {
            const storedListings = localStorage.getItem('mockListings');
            if (storedListings) {
                const parsedListings = JSON.parse(storedListings);
                mockListings = parsedListings.map(listing => ({
                    objectId: `listing-${listing.id}`,
                    title: listing.title,
                    description: listing.description,
                    image: listing.image,
                    quantity: listing.quantity,
                    unit: listing.unit,
                    expiryDate: listing.expiryDate,
                    location: listing.location,
                    category: listing.category || 'produce',
                    type: listing.type || 'donation',
                    status: listing.status || 'available',
                    createdAt: listing.createdAt || '2024-01-01T12:00:00Z',
                    donor: {
                        name: 'User Name',
                        avatar: `https://randomuser.me/api/portraits/men/${listing.userId || 1}.jpg`
                    }
                }));
            }
        } catch (e) {
            console.error('Error parsing mock listings:', e);
        }
        
        // If no mock listings in localStorage, use fallback
        if (mockListings.length === 0) {
            mockListings = Array(6).fill(null).map((_, i) => ({
                objectId: `listing-${i+1}`,
                title: `Food Listing ${i+1}`,
                description: 'Food description goes here.',
                image: `https://images.unsplash.com/photo-${1566385101042+i}?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60`,
                quantity: Math.floor(Math.random() * 10) + 1,
                unit: 'kg',
                expiryDate: '2024-01-20',
                location: 'Brooklyn, NY',
                category: i % 2 === 0 ? 'produce' : 'bakery',
                type: i % 3 === 0 ? 'trade' : 'donation',
                status: i % 4 === 0 ? 'completed' : 'available',
                createdAt: '2024-01-01T12:00:00Z',
                donor: {
                    name: 'User Name',
                    avatar: `https://randomuser.me/api/portraits/${i % 2 === 0 ? 'men' : 'women'}/${i+1}.jpg`
                }
            }));
        }
        
        return {
            items: mockListings,
            nextPageToken: null
        };
    } catch (error) {
        console.error('List food listings error:', error);
        throw new Error('Unable to fetch listings');
    }
}

async function deleteFoodListing(listingId) {
    try {
        // In a real app, this would be a fetch to your backend
        // For demo purposes, we'll just return success
        return { success: true };
    } catch (error) {
        console.error('Delete food listing error:', error);
        throw new Error('Unable to delete listing');
    }
}

// Trade API
async function createTrade(tradeData) {
    try {
        // In a real app, this would be a fetch to your backend
        // For demo purposes, we'll just return the data with an ID
        return {
            ...tradeData,
            objectId: `trade-${Date.now()}`,
            createdAt: new Date().toISOString()
        };
    } catch (error) {
        console.error('Create trade error:', error);
        throw new Error('Unable to create trade');
    }
}

async function updateTradeStatus(tradeId, status) {
    try {
        // In a real app, this would be a fetch to your backend
        // For demo purposes, we'll just return success
        return {
            objectId: tradeId,
            status,
            updatedAt: new Date().toISOString()
        };
    } catch (error) {
        console.error('Update trade status error:', error);
        throw new Error('Unable to update trade status');
    }
}

async function listTrades(params = {}) {
    try {
        // In a real app, this would be a fetch to your backend
        // For demo purposes, we'll return mock data
        const { limit = 20, descent = true, nextPageToken } = params;
        
        // Mock data
        const mockTrades = Array(5).fill(null).map((_, i) => ({
            objectId: `trade-${i+1}`,
            offeredItem: {
                title: `Offered Item ${i+1}`,
                quantity: Math.floor(Math.random() * 5) + 1,
                unit: 'kg'
            },
            requestedItem: {
                title: `Requested Item ${i+1}`,
                quantity: Math.floor(Math.random() * 3) + 1,
                unit: 'kg'
            },
            status: ['pending', 'accepted', 'completed'][i % 3],
            createdAt: '2024-01-01T12:00:00Z',
            user: {
                name: `User ${i+1}`,
                avatar: `https://randomuser.me/api/portraits/${i % 2 === 0 ? 'men' : 'women'}/${i+1}.jpg`
            }
        }));
        
        return {
            items: mockTrades,
            nextPageToken: null
        };
    } catch (error) {
        console.error('List trades error:', error);
        throw new Error('Unable to fetch trades');
    }
}

// Admin API functions
async function listUsers() {
    try {
        // Try to get mock users from localStorage if available
        let mockUsers = [];
        try {
            const storedUsers = localStorage.getItem('mockUsers');
            if (storedUsers) {
                mockUsers = JSON.parse(storedUsers);
            }
        } catch (e) {
            console.error('Error parsing mock users:', e);
        }
        
        // If no mock users in localStorage, use fallback
        if (mockUsers.length === 0) {
            mockUsers = Array(10).fill(null).map((_, i) => ({
                id: i + 1,
                name: `User ${i + 1}`,
                email: `user${i + 1}@example.com`,
                role: i === 0 ? 'admin' : 'user',
                status: i % 3 === 0 ? 'suspended' : 'active',
                joinDate: '2024-01-01',
                avatar: `https://randomuser.me/api/portraits/${i % 2 === 0 ? 'men' : 'women'}/${i + 1}.jpg`
            }));
        }
        
        return {
            items: mockUsers,
            pagination: {
                currentPage: 1,
                totalPages: 5,
                totalUsers: mockUsers.length
            }
        };
    } catch (error) {
        console.error('List users error:', error);
        throw new Error('Unable to fetch users');
    }
}

async function getDistributions() {
    try {
        // Try to get mock distributions from localStorage if available
        let mockDistributions = [];
        try {
            const storedDistributions = localStorage.getItem('mockDistributions');
            if (storedDistributions) {
                mockDistributions = JSON.parse(storedDistributions);
            }
        } catch (e) {
            console.error('Error parsing mock distributions:', e);
        }
        
        // If no mock distributions in localStorage, use fallback
        if (mockDistributions.length === 0) {
            mockDistributions = [
                {
                    id: 1,
                    title: 'Downtown Food Distribution',
                    location: '123 Main St, Downtown',
                    date: '2024-06-15',
                    time: '10:00 AM - 2:00 PM',
                    capacity: 150,
                    registered: 87,
                    description: 'Monthly food distribution for downtown residents.',
                    status: 'scheduled'
                },
                {
                    id: 2,
                    title: 'Community Center Distribution',
                    location: '456 Park Ave, Westside',
                    date: '2024-06-22',
                    time: '9:00 AM - 1:00 PM',
                    capacity: 100,
                    registered: 65,
                    description: 'Food distribution for families in the Westside area.',
                    status: 'scheduled'
                },
                {
                    id: 3,
                    title: 'School Pantry Program',
                    location: 'Lincoln Elementary School',
                    date: '2024-06-10',
                    time: '3:00 PM - 6:00 PM',
                    capacity: 75,
                    registered: 75,
                    description: 'Food distribution for school families.',
                    status: 'full'
                },
                {
                    id: 4,
                    title: 'Senior Center Distribution',
                    location: 'Golden Years Senior Center',
                    date: '2024-06-05',
                    time: '10:00 AM - 12:00 PM',
                    capacity: 50,
                    registered: 32,
                    description: 'Food distribution tailored for seniors.',
                    status: 'completed'
                }
            ];
        }
        
        return { items: mockDistributions };
    } catch (error) {
        console.error('Get distributions error:', error);
        throw new Error('Unable to fetch distributions');
    }
}

// Simulated function for API calls (to be used in place of actual fetch calls)
async function trickleGetObject(objectType, objectId) {
    // This is a placeholder function to simulate API calls
    return { objectId, objectType };
}

async function trickleUpdateObject(objectType, objectId, data) {
    // This is a placeholder function to simulate API calls
    return { ...data, objectId, objectType };
}

async function trickleCreateObject(objectType, data) {
    // This is a placeholder function to simulate API calls
    return { ...data, objectId: `${objectType}-${Date.now()}`, objectType };
}

async function trickleListObjects(objectType, limit = 20, descent = true, nextPageToken) {
    // This is a placeholder function to simulate API calls
    return { 
        items: Array(limit).fill(null).map((_, i) => ({ 
            objectId: `${objectType}-${i}`,
            objectType,
            data: { index: i }
        })),
        nextPageToken: null
    };
}
