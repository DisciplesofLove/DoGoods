function FoodList({
    foods,
    onClaim,
    onTrade,
    loading = false,
    error = null
}) {
    try {
        if (loading) {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div
                            key={i}
                            className="animate-pulse bg-gray-200 rounded-lg h-96"
                        />
                    ))}
                </div>
            );
        }

        if (error) {
            return (
                <div className="text-center py-8">
                    <i className="fas fa-exclamation-circle text-red-500 text-4xl mb-4"></i>
                    <p className="text-gray-600">{error}</p>
                    <Button
                        variant="secondary"
                        className="mt-4"
                        onClick={() => window.location.reload()}
                    >
                        Try Again
                    </Button>
                </div>
            );
        }

        if (!foods?.length) {
            return (
                <div className="text-center py-8">
                    <i className="fas fa-box-open text-gray-400 text-4xl mb-4"></i>
                    <p className="text-gray-600">No food listings available</p>
                </div>
            );
        }

        return (
            <div data-name="food-list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {foods.map((food) => (
                    <FoodCard
                        key={food.objectId}
                        food={food}
                        onClaim={onClaim}
                        onTrade={onTrade}
                    />
                ))}
            </div>
        );
    } catch (error) {
        console.error('FoodList component error:', error);
        reportError(error);
        return null;
    }
}
