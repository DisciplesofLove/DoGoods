function Success() {
    try {
        const stories = [
            {
                id: 1,
                title: "Local Restaurant's Food Rescue Initiative",
                description: "How a small restaurant made a big impact by donating surplus food...",
                impact: {
                    meals: 1500,
                    waste: 750,
                    co2: 1200
                },
                image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352",
                author: {
                    name: "John Smith",
                    role: "Restaurant Owner",
                    avatar: "https://randomuser.me/api/portraits/men/2.jpg"
                }
            },
            // Add more success stories...
        ];

        const stats = {
            totalMeals: 25000,
            wasteReduced: 12500,
            co2Saved: 18750,
            activeUsers: 5000
        };

        return (
            <div data-name="success-stories" className="max-w-7xl mx-auto py-12 px-4">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Success Stories
                    </h1>
                    <p className="text-xl text-gray-600">
                        Real impact stories from our community members
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
                    <Card>
                        <div className="text-center p-6">
                            <div className="text-3xl font-bold text-green-600">
                                {stats.totalMeals.toLocaleString()}
                            </div>
                            <div className="text-sm text-gray-600">Meals Shared</div>
                        </div>
                    </Card>
                    <Card>
                        <div className="text-center p-6">
                            <div className="text-3xl font-bold text-green-600">
                                {stats.wasteReduced.toLocaleString()}kg
                            </div>
                            <div className="text-sm text-gray-600">Food Waste Reduced</div>
                        </div>
                    </Card>
                    <Card>
                        <div className="text-center p-6">
                            <div className="text-3xl font-bold text-green-600">
                                {stats.co2Saved.toLocaleString()}kg
                            </div>
                            <div className="text-sm text-gray-600">CO2 Emissions Saved</div>
                        </div>
                    </Card>
                    <Card>
                        <div className="text-center p-6">
                            <div className="text-3xl font-bold text-green-600">
                                {stats.activeUsers.toLocaleString()}+
                            </div>
                            <div className="text-sm text-gray-600">Active Members</div>
                        </div>
                    </Card>
                </div>

                <div className="space-y-12">
                    {stories.map((story, index) => (
                        <Card key={story.id} className="overflow-hidden">
                            <div className="md:flex">
                                <div className="md:flex-shrink-0">
                                    <img
                                        className="h-48 w-full object-cover md:h-full md:w-48"
                                        src={story.image}
                                        alt={story.title}
                                    />
                                </div>
                                <div className="p-8">
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-2xl font-bold text-gray-900">
                                            {story.title}
                                        </h2>
                                        <div className="flex items-center space-x-2">
                                            <Avatar
                                                src={story.author.avatar}
                                                size="md"
                                            />
                                            <div>
                                                <div className="font-medium">
                                                    {story.author.name}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {story.author.role}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <p className="text-gray-600 mb-6">
                                        {story.description}
                                    </p>

                                    <div className="grid grid-cols-3 gap-4 mb-6">
                                        <div className="text-center p-4 bg-green-50 rounded-lg">
                                            <div className="font-bold text-green-600">
                                                {story.impact.meals}
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                Meals Shared
                                            </div>
                                        </div>
                                        <div className="text-center p-4 bg-green-50 rounded-lg">
                                            <div className="font-bold text-green-600">
                                                {story.impact.waste}kg
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                Waste Reduced
                                            </div>
                                        </div>
                                        <div className="text-center p-4 bg-green-50 rounded-lg">
                                            <div className="font-bold text-green-600">
                                                {story.impact.co2}kg
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                CO2 Saved
                                            </div>
                                        </div>
                                    </div>

                                    <Button variant="primary">
                                        Read Full Story
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">
                        Share Your Success Story
                    </h2>
                    <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                        Have you made an impact in your community through ShareFoods?
                        We'd love to hear your story and share it with others.
                    </p>
                    <Button
                        variant="primary"
                        size="lg"
                        icon={<i className="fas fa-pen"></i>}
                    >
                        Submit Your Story
                    </Button>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Success Stories page error:', error);
        reportError(error);
        return null;
    }
}
