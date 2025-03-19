function FeaturedListings({ listings, onClaim, onTrade }) {
    try {
        return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {listings.map((listing) => (
                    <FoodCard
                        key={listing.id}
                        food={listing}
                        onClaim={onClaim}
                        onTrade={onTrade}
                        showReturnButton={true}
                    />
                ))}
            </div>
        );
    } catch (error) {
        console.error('FeaturedListings component error:', error);
        reportError(error);
        return null;
    }
}
