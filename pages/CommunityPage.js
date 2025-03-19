function CommunityPage() {
    try {
        const [posts, setPosts] = React.useState([
            {
                objectId: '1',
                title: 'Tips for Reducing Food Waste at Home',
                content: `I've been implementing a few strategies that have dramatically reduced food waste in my household:
                
                1. Plan meals and make a shopping list
                2. Store food properly (I use glass containers)
                3. Use the freezer for leftovers and items about to expire
                4. Get creative with leftovers - soups, stir-fries, etc.
                
                What strategies do you use to reduce waste?`,
                createdAt: '2024-01-15T09:30:00Z',
                category: 'tips',
                likes: 24,
                author: {
                    name: 'Emma Wilson',
                    avatar: 'https://randomuser.me/api/portraits/women/8.jpg'
                },
                comments: [
                    {
                        objectId: '101',
                        content: 'Great tips! I also keep a "eat this first" box in my fridge for items that need to be used soon.',
                        createdAt: '2024-01-15T10:15:00Z',
                        author: {
                            name: 'Michael Chen',
                            avatar: 'https://randomuser.me/api/portraits/men/5.jpg'
                        }
                    },
                    {
                        objectId: '102',
                        content: "I started composting last year and it's been a game changer!",
                        createdAt: '2024-01-15T11:20:00Z',
                        author: {
                            name: 'Sarah Johnson',
                            avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
                        }
                    }
                ]
            },
            {
                objectId: '2',
                title: 'Community Garden Harvest Day This Weekend!',
                content: `We're hosting our monthly harvest day at the Greenwood Community Garden this Saturday from 10am-2pm. 

                We'll have plenty of fresh vegetables to share with the community. If you've been growing anything you'd like to contribute, please bring it along!

                Location: Greenwood Community Garden, 123 Park Street
                Date: Saturday, January 20th
                Time: 10am - 2pm

                Hope to see you there!`,
                createdAt: '2024-01-14T14:45:00Z',
                category: 'events',
                likes: 42,
                author: {
                    name: 'David Rodriguez',
                    avatar: 'https://randomuser.me/api/portraits/men/7.jpg'
                },
                comments: [
                    {
                        objectId: '201',
                        content: "Looking forward to it! I'll bring some of my homegrown tomatoes.",
                        createdAt: '2024-01-14T15:30:00Z',
                        author: {
                            name: 'Jessica Thompson',
                            avatar: 'https://randomuser.me/api/portraits/women/12.jpg'
                        }
                    },
                    {
                        objectId: '202',
                        content: 'Will there be any workshops this time?',
                        createdAt: '2024-01-14T16:05:00Z',
                        author: {
                            name: 'Robert Kim',
                            avatar: 'https://randomuser.me/api/portraits/men/10.jpg'
                        }
                    },
                    {
                        objectId: '203',
                        content: "Yes, we'll have a seed saving workshop at 11am and a composting demo at 1pm!",
                        createdAt: '2024-01-14T16:30:00Z',
                        author: {
                            name: 'David Rodriguez',
                            avatar: 'https://randomuser.me/api/portraits/men/7.jpg'
                        }
                    }
                ]
            },
            {
                objectId: '3',
                title: 'Recipe: Zero-Waste Vegetable Stock',
                content: `Here's my favorite way to use vegetable scraps instead of throwing them away:

                Zero-Waste Vegetable Stock
                
                Ingredients:
                - 1 gallon zip-top bag filled with vegetable scraps (onion peels, carrot tops, celery ends, herb stems, etc.)
                - 8 cups water
                - 1 bay leaf
                - 5 peppercorns
                
                Instructions:
                1. Keep a bag in your freezer and add vegetable scraps as you cook
                2. Once full, empty into a large pot with water and seasonings
                3. Bring to a boil, then simmer for 1 hour
                4. Strain and use in soups, risottos, or any recipe calling for broth
                
                Store in the refrigerator for up to a week or freeze for 3 months!`,
                createdAt: '2024-01-12T11:20:00Z',
                category: 'recipes',
                likes: 36,
                author: {
                    name: 'Sarah Johnson',
                    avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
                },
                comments: [
                    {
                        objectId: '301',
                        content: 'I do this too! I also add mushroom stems for extra flavor.',
                        createdAt: '2024-01-12T12:10:00Z',
                        author: {
                            name: 'Emma Wilson',
                            avatar: 'https://randomuser.me/api/portraits/women/8.jpg'
                        }
                    }
                ]
            },
            {
                objectId: '4',
                title: 'Success Story: Local Restaurant Reduces Food Waste by 75%',
                content: `I wanted to share an inspiring story from our community! The Green Table Restaurant has implemented a comprehensive food waste reduction program and has reduced their kitchen waste by 75% in just six months.

                Their strategies include:
                - Careful inventory management
                - Staff training on proper food storage
                - Creative menu planning to use all parts of ingredients
                - Partnering with ShareFoods to donate surplus food
                - Composting unavoidable food waste
                
                They're hosting a workshop for other local businesses next month. If you're interested, let me know and I can share the details!`,
                createdAt: '2024-01-10T09:15:00Z',
                category: 'stories',
                likes: 51,
                author: {
                    name: 'Michael Chen',
                    avatar: 'https://randomuser.me/api/portraits/men/5.jpg'
                },
                comments: [
                    {
                        objectId: '401',
                        content: "This is amazing! I'd love to attend the workshop.",
                        createdAt: '2024-01-10T10:20:00Z',
                        author: {
                            name: 'Robert Kim',
                            avatar: 'https://randomuser.me/api/portraits/men/10.jpg'
                        }
                    },
                    {
                        objectId: '402',
                        content: "I've eaten at The Green Table and their food is delicious. Great to know they're environmentally conscious too!",
                        createdAt: '2024-01-10T11:05:00Z',
                        author: {
                            name: 'Jessica Thompson',
                            avatar: 'https://randomuser.me/api/portraits/women/12.jpg'
                        }
                    }
                ]
            },
            {
                objectId: '5',
                title: 'Question: Best Way to Store Fresh Herbs?',
                content: `I always end up with wilted herbs before I can use them all. What's your best method for keeping herbs fresh longer? I've tried a few different methods but haven't found the perfect solution yet.`,
                createdAt: '2024-01-08T16:40:00Z',
                category: 'tips',
                likes: 18,
                author: {
                    name: 'Robert Kim',
                    avatar: 'https://randomuser.me/api/portraits/men/10.jpg'
                },
                comments: [
                    {
                        objectId: '501',
                        content: 'I treat herbs like flowers - trim the stems and place in a jar with water, then cover loosely with a plastic bag and refrigerate. Works great for cilantro, parsley, etc.',
                        createdAt: '2024-01-08T17:15:00Z',
                        author: {
                            name: 'Sarah Johnson',
                            avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
                        }
                    },
                    {
                        objectId: '502',
                        content: 'You can also chop and freeze herbs in ice cube trays with a bit of water or olive oil. Perfect for cooking later!',
                        createdAt: '2024-01-08T17:30:00Z',
                        author: {
                            name: 'Emma Wilson',
                            avatar: 'https://randomuser.me/api/portraits/women/8.jpg'
                        }
                    },
                    {
                        objectId: '503',
                        content: 'For woody herbs like rosemary and thyme, I wrap them in a slightly damp paper towel, then in a zip-top bag with some air left in it.',
                        createdAt: '2024-01-08T18:05:00Z',
                        author: {
                            name: 'David Rodriguez',
                            avatar: 'https://randomuser.me/api/portraits/men/7.jpg'
                        }
                    }
                ]
            }
        ]);
        const [loading, setLoading] = React.useState(false);
        const [error, setError] = React.useState(null);
        const [newPost, setNewPost] = React.useState({ title: '', content: '', category: 'tips' });
        const [selectedCategory, setSelectedCategory] = React.useState('all');
        const [commentInputs, setCommentInputs] = React.useState({});
        const [likedPosts, setLikedPosts] = React.useState({});

        React.useEffect(() => {
            loadPosts();
        }, [selectedCategory]);

        const loadPosts = async () => {
            setLoading(true);
            try {
                // In a real app, this would be an API call
                await new Promise(resolve => setTimeout(resolve, 800));
                // Data is already set in the initial state
                setLoading(false);
            } catch (error) {
                console.error('Load posts error:', error);
                setError('Failed to load community posts');
                setLoading(false);
            }
        };

        const handleCreatePost = async (e) => {
            e.preventDefault();
            
            if (!newPost.title.trim() || !newPost.content.trim()) {
                alert('Please provide both a title and content for your post.');
                return;
            }
            
            try {
                setLoading(true);
                
                // In a real app, this would be an API call
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                const newPostObj = {
                    objectId: `${posts.length + 1}`,
                    ...newPost,
                    createdAt: new Date().toISOString(),
                    likes: 0,
                    author: {
                        name: 'You (Current User)',
                        avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
                    },
                    comments: []
                };
                
                setPosts([newPostObj, ...posts]);
                setNewPost({ title: '', content: '', category: 'tips' });
                setLoading(false);
                
                // Show success message
                alert('Your post has been published!');
            } catch (error) {
                console.error('Create post error:', error);
                alert('Failed to create post. Please try again.');
                setLoading(false);
            }
        };

        const handleComment = async (postId) => {
            const commentContent = commentInputs[postId];
            
            if (!commentContent?.trim()) {
                return;
            }
            
            try {
                setLoading(true);
                
                // In a real app, this would be an API call
                await new Promise(resolve => setTimeout(resolve, 500));
                
                const newComment = {
                    objectId: `${Date.now()}`,
                    content: commentContent,
                    createdAt: new Date().toISOString(),
                    author: {
                        name: 'You (Current User)',
                        avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
                    }
                };
                
                setPosts(posts.map(post => 
                    post.objectId === postId
                        ? { ...post, comments: [...(post.comments || []), newComment] }
                        : post
                ));
                
                // Clear the input
                setCommentInputs({
                    ...commentInputs,
                    [postId]: ''
                });
                
                setLoading(false);
            } catch (error) {
                console.error('Add comment error:', error);
                alert('Failed to add comment. Please try again.');
                setLoading(false);
            }
        };

        const handleLike = async (postId) => {
            if (likedPosts[postId]) {
                return; // Already liked
            }
            
            try {
                // In a real app, this would be an API call
                await new Promise(resolve => setTimeout(resolve, 300));
                
                setPosts(posts.map(post => 
                    post.objectId === postId
                        ? { ...post, likes: post.likes + 1 }
                        : post
                ));
                
                setLikedPosts({
                    ...likedPosts,
                    [postId]: true
                });
            } catch (error) {
                console.error('Like post error:', error);
            }
        };

        const categories = [
            { id: 'all', label: 'All Posts' },
            { id: 'tips', label: 'Food Tips' },
            { id: 'recipes', label: 'Recipes' },
            { id: 'stories', label: 'Success Stories' },
            { id: 'events', label: 'Events' }
        ];

        const filteredPosts = React.useMemo(() => {
            if (selectedCategory === 'all') {
                return posts;
            }
            return posts.filter(post => post.category === selectedCategory);
        }, [posts, selectedCategory]);

        return (
            <div data-name="community-page" className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Community</h1>
                    <p className="mt-2 text-gray-600">
                        Connect with other members, share tips, and celebrate success stories.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <Card className="mb-8">
                            <form onSubmit={handleCreatePost} className="p-6">
                                <div className="mb-4">
                                    <Input
                                        label="Post Title"
                                        placeholder="What's on your mind?"
                                        value={newPost.title}
                                        onChange={(e) => setNewPost(prev => ({
                                            ...prev,
                                            title: e.target.value
                                        }))}
                                        required
                                    />
                                </div>
                                
                                <div className="mb-4">
                                    <Input
                                        type="textarea"
                                        label="Post Content"
                                        placeholder="Share your thoughts, tips, or questions..."
                                        value={newPost.content}
                                        onChange={(e) => setNewPost(prev => ({
                                            ...prev,
                                            content: e.target.value
                                        }))}
                                        required
                                        rows={6}
                                    />
                                </div>
                                
                                <div className="mb-4">
                                    <Input
                                        type="select"
                                        label="Category"
                                        value={newPost.category}
                                        onChange={(e) => setNewPost(prev => ({
                                            ...prev,
                                            category: e.target.value
                                        }))}
                                        options={categories.filter(c => c.id !== 'all').map(c => ({
                                            value: c.id,
                                            label: c.label
                                        }))}
                                    />
                                </div>
                                
                                <div className="flex justify-end">
                                    <Button 
                                        type="submit"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <div className="flex items-center">
                                                <i className="fas fa-spinner fa-spin mr-2"></i>
                                                Posting...
                                            </div>
                                        ) : (
                                            <div className="flex items-center">
                                                <i className="fas fa-paper-plane mr-2"></i>
                                                Post
                                            </div>
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </Card>

                        {loading && !posts.length ? (
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
                                    onClick={loadPosts}
                                >
                                    Try Again
                                </Button>
                            </div>
                        ) : filteredPosts.length === 0 ? (
                            <div className="text-center py-8">
                                <i className="fas fa-comments text-gray-400 text-4xl mb-4"></i>
                                <p className="text-gray-600">No posts in this category yet</p>
                                <Button
                                    variant="primary"
                                    className="mt-4"
                                    onClick={() => setSelectedCategory('all')}
                                >
                                    View All Categories
                                </Button>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {filteredPosts.map((post) => (
                                    <Card key={post.objectId} className="overflow-hidden">
                                        <div className="p-6">
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center space-x-3">
                                                    <Avatar src={post.author.avatar} size="md" />
                                                    <div>
                                                        <h3 className="font-medium">{post.author.name}</h3>
                                                        <p className="text-sm text-gray-500">{timeAgo(post.createdAt)}</p>
                                                    </div>
                                                </div>
                                                <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                                                    {categories.find(c => c.id === post.category)?.label || 'General'}
                                                </span>
                                            </div>
                                            
                                            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                                            <div className="text-gray-700 mb-4 whitespace-pre-line">
                                                {post.content}
                                            </div>
                                            
                                            <div className="flex items-center space-x-6 mb-6">
                                                <button 
                                                    className={`flex items-center space-x-2 ${likedPosts[post.objectId] ? 'text-green-600' : 'text-gray-500 hover:text-gray-700'}`}
                                                    onClick={() => handleLike(post.objectId)}
                                                >
                                                    <i className={`${likedPosts[post.objectId] ? 'fas' : 'far'} fa-heart`}></i>
                                                    <span>{post.likes}</span>
                                                </button>
                                                <button className="flex items-center space-x-2 text-gray-500 hover:text-gray-700">
                                                    <i className="far fa-comment"></i>
                                                    <span>{post.comments?.length || 0}</span>
                                                </button>
                                                <button className="flex items-center space-x-2 text-gray-500 hover:text-gray-700">
                                                    <i className="far fa-share-square"></i>
                                                    <span>Share</span>
                                                </button>
                                            </div>
                                            
                                            {post.comments?.length > 0 && (
                                                <div className="mb-4">
                                                    <h4 className="text-sm font-medium text-gray-700 mb-2">Comments</h4>
                                                    <div className="space-y-3">
                                                        {post.comments.map((comment) => (
                                                            <div key={comment.objectId} className="flex space-x-3">
                                                                <Avatar src={comment.author.avatar} size="sm" />
                                                                <div className="flex-1 bg-gray-50 rounded-lg p-3">
                                                                    <div className="flex justify-between mb-1">
                                                                        <span className="font-medium text-sm">
                                                                            {comment.author.name}
                                                                        </span>
                                                                        <span className="text-xs text-gray-500">
                                                                            {timeAgo(comment.createdAt)}
                                                                        </span>
                                                                    </div>
                                                                    <p className="text-sm text-gray-700">{comment.content}</p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                            
                                            <div className="flex space-x-3">
                                                <Avatar size="sm" src="https://randomuser.me/api/portraits/men/1.jpg" />
                                                <div className="flex-1 relative">
                                                    <input
                                                        type="text"
                                                        className="w-full px-4 py-2 pr-10 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                                        placeholder="Add a comment..."
                                                        value={commentInputs[post.objectId] || ''}
                                                        onChange={(e) => setCommentInputs({
                                                            ...commentInputs,
                                                            [post.objectId]: e.target.value
                                                        })}
                                                        onKeyPress={(e) => {
                                                            if (e.key === 'Enter') {
                                                                handleComment(post.objectId);
                                                            }
                                                        }}
                                                    />
                                                    <button
                                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-600 hover:text-green-700"
                                                        onClick={() => handleComment(post.objectId)}
                                                        disabled={!commentInputs[post.objectId]?.trim()}
                                                    >
                                                        <i className="fas fa-paper-plane"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="lg:col-span-1">
                        <Card className="mb-6">
                            <div className="p-6">
                                <h3 className="text-lg font-medium mb-4">Categories</h3>
                                <nav className="space-y-2">
                                    {categories.map((category) => (
                                        <button
                                            key={category.id}
                                            onClick={() => setSelectedCategory(category.id)}
                                            className={`
                                                w-full text-left px-3 py-2 rounded-lg transition-colors
                                                ${selectedCategory === category.id ?
                                                    'bg-green-50 text-green-600' :
                                                    'text-gray-600 hover:bg-gray-50'
                                                }
                                            `}
                                        >
                                            {category.label}
                                        </button>
                                    ))}
                                </nav>
                            </div>
                        </Card>

                        <Card className="mb-6">
                            <div className="p-6">
                                <h3 className="text-lg font-medium mb-4">Community Stats</h3>
                                <div className="space-y-4">
                                    <div>
                                        <div className="text-2xl font-bold text-green-600">1,234</div>
                                        <div className="text-sm text-gray-500">Active Members</div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-green-600">567</div>
                                        <div className="text-sm text-gray-500">Posts This Month</div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-green-600">89</div>
                                        <div className="text-sm text-gray-500">Events Planned</div>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        <Card>
                            <div className="p-6">
                                <h3 className="text-lg font-medium mb-4">Upcoming Events</h3>
                                <div className="space-y-4">
                                    <div className="border-l-4 border-green-500 pl-3">
                                        <div className="text-sm text-gray-500">Jan 20</div>
                                        <div className="font-medium">Community Garden Harvest Day</div>
                                        <div className="text-sm">Greenwood Garden • 10am - 2pm</div>
                                    </div>
                                    <div className="border-l-4 border-green-500 pl-3">
                                        <div className="text-sm text-gray-500">Jan 25</div>
                                        <div className="font-medium">Food Waste Workshop</div>
                                        <div className="text-sm">Community Center • 6pm - 8pm</div>
                                    </div>
                                    <div className="border-l-4 border-green-500 pl-3">
                                        <div className="text-sm text-gray-500">Feb 3</div>
                                        <div className="font-medium">Monthly Food Drive</div>
                                        <div className="text-sm">Central Park • 9am - 12pm</div>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <Button variant="secondary" size="sm" fullWidth>
                                        View All Events
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('CommunityPage error:', error);
        reportError(error);
        return null;
    }
}
