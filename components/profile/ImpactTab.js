function ImpactTab({ impact }) {
    try {
        const monthlyData = [
            { month: 'Jan', foodSaved: 120, co2Reduced: 180 },
            { month: 'Feb', foodSaved: 150, co2Reduced: 225 },
            { month: 'Mar', foodSaved: 180, co2Reduced: 270 },
            { month: 'Apr', foodSaved: 200, co2Reduced: 300 },
            { month: 'May', foodSaved: 250, co2Reduced: 375 },
            { month: 'Jun', foodSaved: 300, co2Reduced: 450 }
        ];

        const achievements = [
            {
                title: 'Food Hero',
                description: 'Donated 10+ food items',
                icon: 'fa-medal',
                progress: 80
            },
            {
                title: 'Eco Warrior',
                description: 'Saved 20kg of food waste',
                icon: 'fa-leaf',
                progress: 65
            },
            {
                title: 'Community Champion',
                description: 'Helped 50+ people',
                icon: 'fa-users',
                progress: 45
            }
        ];

        return (
            <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                        <div className="p-6">
                            <h3 className="text-lg font-semibold mb-4">Total Impact</h3>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between mb-1">
                                        <span className="text-gray-600">Food Saved</span>
                                        <span className="font-medium">{impact.foodSaved}kg</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div 
                                            className="bg-green-600 rounded-full h-2" 
                                            style={{ width: '75%' }}
                                        ></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between mb-1">
                                        <span className="text-gray-600">CO2 Emissions Reduced</span>
                                        <span className="font-medium">{impact.co2Reduced}kg</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div 
                                            className="bg-green-600 rounded-full h-2" 
                                            style={{ width: '60%' }}
                                        ></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between mb-1">
                                        <span className="text-gray-600">People Helped</span>
                                        <span className="font-medium">{impact.peopleHelped}</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div 
                                            className="bg-green-600 rounded-full h-2" 
                                            style={{ width: '85%' }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card>
                        <div className="p-6">
                            <h3 className="text-lg font-semibold mb-4">Environmental Equivalents</h3>
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                                        <i className="fas fa-car text-green-600"></i>
                                    </div>
                                    <div>
                                        <div className="font-medium">Car Miles Saved</div>
                                        <div className="text-gray-500">{impact.carMilesSaved} miles</div>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                                        <i className="fas fa-shower text-green-600"></i>
                                    </div>
                                    <div>
                                        <div className="font-medium">Water Saved</div>
                                        <div className="text-gray-500">{impact.waterSaved} liters</div>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                                        <i className="fas fa-lightbulb text-green-600"></i>
                                    </div>
                                    <div>
                                        <div className="font-medium">Energy Saved</div>
                                        <div className="text-gray-500">{impact.energySaved} kWh</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                <Card>
                    <div className="p-6">
                        <h3 className="text-lg font-semibold mb-6">Monthly Progress</h3>
                        <div className="h-64">
                            <div className="flex h-full items-end space-x-2">
                                {monthlyData.map((data, index) => (
                                    <div key={index} className="flex-1 flex flex-col items-center">
                                        <div className="w-full flex flex-col items-center space-y-1">
                                            <div 
                                                className="w-full bg-green-500 rounded-t"
                                                style={{ height: `${(data.foodSaved / 300) * 100}%` }}
                                            ></div>
                                            <div 
                                                className="w-full bg-blue-500 rounded-t"
                                                style={{ height: `${(data.co2Reduced / 450) * 100}%` }}
                                            ></div>
                                        </div>
                                        <div className="mt-2 text-xs text-gray-500">{data.month}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="mt-4 flex justify-center space-x-4">
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                                <span className="text-sm text-gray-600">Food Saved</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                                <span className="text-sm text-gray-600">CO2 Reduced</span>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card>
                    <div className="p-6">
                        <h3 className="text-lg font-semibold mb-6">Achievements</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {achievements.map((achievement, index) => (
                                <div key={index} className="text-center">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <i className={`fas ${achievement.icon} text-2xl text-green-600`}></i>
                                    </div>
                                    <h4 className="font-medium mb-1">{achievement.title}</h4>
                                    <p className="text-sm text-gray-500 mb-3">{achievement.description}</p>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div 
                                            className="bg-green-600 rounded-full h-2" 
                                            style={{ width: `${achievement.progress}%` }}
                                        ></div>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-1">{achievement.progress}% Complete</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>
            </div>
        );
    } catch (error) {
        console.error('ImpactTab component error:', error);
        reportError(error);
        return null;
    }
}
