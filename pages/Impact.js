function Impact() {
    try {
        const stats = {
            totalMeals: 25000,
            wasteReduced: 12500,
            co2Saved: 18750,
            communities: 150,
            donors: 2500,
            recipients: 5000
        };

        const impactCategories = [
            {
                title: 'Environmental Impact',
                stats: [
                    {
                        label: 'CO2 Emissions Saved',
                        value: `${stats.co2Saved.toLocaleString()}kg`,
                        icon: 'fa-leaf'
                    },
                    {
                        label: 'Food Waste Reduced',
                        value: `${stats.wasteReduced.toLocaleString()}kg`,
                        icon: 'fa-recycle'
                    }
                ]
            },
            {
                title: 'Social Impact',
                stats: [
                    {
                        label: 'Meals Shared',
                        value: stats.totalMeals.toLocaleString(),
                        icon: 'fa-utensils'
                    },
                    {
                        label: 'Communities Served',
                        value: stats.communities.toLocaleString(),
                        icon: 'fa-users'
                    }
                ]
            },
            {
                title: 'Community Growth',
                stats: [
                    {
                        label: 'Active Donors',
                        value: stats.donors.toLocaleString(),
                        icon: 'fa-hand-holding-heart'
                    },
                    {
                        label: 'Recipients Helped',
                        value: stats.recipients.toLocaleString(),
                        icon: 'fa-hands-helping'
                    }
                ]
            }
        ];

        const monthlyData = [
            { month: 'Jan', meals: 1500, waste: 750 },
            { month: 'Feb', meals: 1800, waste: 900 },
            { month: 'Mar', meals: 2200, waste: 1100 },
            // Add more monthly data...
        ];

        const handleNavigation = (path) => {
            window.location.href = path;
        };

        return (
            <div data-name="impact-reports" className="max-w-7xl mx-auto py-12 px-4">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Our Impact
                    </h1>
                    <p className="text-xl text-gray-600">
                        Measuring our contribution to reducing food waste and helping communities
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                    {impactCategories.map((category, index) => (
                        <Card key={index} className="p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">
                                {category.title}
                            </h2>
                            <div className="space-y-6">
                                {category.stats.map((stat, statIndex) => (
                                    <div key={statIndex} className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                            <i className={`fas ${stat.icon} text-xl text-green-600`}></i>
                                        </div>
                                        <div>
                                            <div className="text-2xl font-bold text-gray-900">
                                                {stat.value}
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                {stat.label}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    ))}
                </div>

                <Card className="p-8 mb-16">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">
                        Monthly Progress
                    </h2>
                    <div className="h-80 bg-gray-50 rounded-lg p-4">
                        {/* Placeholder for chart */}
                        <div className="w-full h-full flex items-center justify-center text-gray-500">
                            Chart visualization would go here
                        </div>
                    </div>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    <Card className="p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">
                            Top Contributing Communities
                        </h2>
                        <div className="space-y-4">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                            <span className="font-bold text-green-600">
                                                {i}
                                            </span>
                                        </div>
                                        <div>
                                            <div className="font-medium">
                                                Community {i}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {1000 - i * 100} meals shared
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-green-600">
                                        +{20 - i}%
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">
                            Recent Milestones
                        </h2>
                        <div className="space-y-4">
                            {[
                                '25,000 meals shared',
                                '5,000 active users reached',
                                '150 communities served',
                                'Launched in 10 new cities',
                                'Reduced 12,500kg of food waste'
                            ].map((milestone, index) => (
                                <div key={index} className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                        <i className="fas fa-check text-green-600"></i>
                                    </div>
                                    <div className="font-medium">{milestone}</div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        Help Us Make a Bigger Impact
                    </h2>
                    <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                        Join our community and be part of the solution to reduce food waste
                        and help those in need.
                    </p>
                    <div className="flex justify-center space-x-4">
                        <button
                            onClick={() => handleNavigation('/signup')}
                            className="inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-200 bg-green-600 text-white hover:bg-green-700 disabled:bg-green-300 px-6 py-3 text-lg cursor-pointer"
                        >
                            <span className="mr-2"><i className="fas fa-user-plus"></i></span>
                            Join Now
                        </button>
                        <Button
                            variant="secondary"
                            size="lg"
                            icon={<i className="fas fa-download"></i>}
                            onClick={() => handleNavigation('/impact/report')}
                        >
                            Download Report
                        </Button>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Impact Reports page error:', error);
        reportError(error);
        return null;
    }
}
