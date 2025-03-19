function Blog() {
    try {
        const [posts, setPosts] = React.useState([
            {
                id: 1,
                title: 'Reducing Food Waste: A Community Approach',
                excerpt: 'Learn how communities are coming together to combat food waste...',
                image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
                category: 'Food Waste',
                author: {
                    name: 'Sarah Johnson',
                    avatar: 'https://randomuser.me/api/portraits/women/1.jpg'
                },
                date: '2024-01-15'
            },
            {
                id: 2,
                title: 'Success Stories: Making a Difference',
                excerpt: 'Read inspiring stories from our community members...',
                image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
                category: 'Success Stories',
                author: {
                    name: 'Michael Chen',
                    avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
                },
                date: '2024-01-10'
            },
            // Add more blog posts...
        ]);

        const categories = [
            'All',
            'Food Waste',
            'Success Stories',
            'Tips & Tricks',
            'Community News',
            'Events'
        ];

        const [selectedCategory, setSelectedCategory] = React.useState('All');

        const filteredPosts = selectedCategory === 'All'
            ? posts
            : posts.filter(post => post.category === selectedCategory);

        return (
            <div data-name="blog" className="max-w-7xl mx-auto py-12 px-4">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        ShareFoods Blog
                    </h1>
                    <p className="text-xl text-gray-600">
                        Stories, updates, and insights from our community
                    </p>
                </div>

                <div className="flex flex-wrap gap-4 mb-8">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`
                                px-4 py-2 rounded-full text-sm font-medium
                                ${selectedCategory === category
                                    ? 'bg-green-600 text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }
                            `}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPosts.map((post) => (
                        <Card
                            key={post.id}
                            className="overflow-hidden"
                            image={post.image}
                        >
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="px-3 py-1 text-sm font-medium text-green-600 bg-green-100 rounded-full">
                                        {post.category}
                                    </span>
                                    <span className="text-sm text-gray-500">
                                        {formatDate(post.date)}
                                    </span>
                                </div>
                                
                                <h2 className="text-xl font-semibold mb-2">
                                    {post.title}
                                </h2>
                                <p className="text-gray-600 mb-4">
                                    {post.excerpt}
                                </p>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <Avatar
                                            src={post.author.avatar}
                                            size="sm"
                                        />
                                        <span className="text-sm font-medium">
                                            {post.author.name}
                                        </span>
                                    </div>
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                    >
                                        Read More
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Button
                        variant="primary"
                        size="lg"
                    >
                        Load More Posts
                    </Button>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Blog page error:', error);
        reportError(error);
        return null;
    }
}
