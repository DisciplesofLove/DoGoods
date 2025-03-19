function ProfileStats({ stats }) {
    try {
        return (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="text-3xl font-bold text-green-600">{stats.donations}</div>
                    <div className="text-sm text-gray-500">Donations Made</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="text-3xl font-bold text-green-600">{stats.trades}</div>
                    <div className="text-sm text-gray-500">Trades Completed</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="text-3xl font-bold text-green-600">{stats.foodSaved}kg</div>
                    <div className="text-sm text-gray-500">Food Saved</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="text-3xl font-bold text-green-600">{stats.impact}kg</div>
                    <div className="text-sm text-gray-500">CO2 Reduced</div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('ProfileStats component error:', error);
        reportError(error);
        return null;
    }
}
