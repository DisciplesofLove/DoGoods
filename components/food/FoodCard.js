function FoodCard({
    food,
    onClaim,
    onTrade,
    className = '',
    showReturnButton = false
}) {
    try {
        const {
            title,
            description,
            image,
            quantity,
            unit,
            expiryDate,
            location,
            donor,
            type = 'donation', // 'donation' or 'trade'
        } = food;

        const expirationStatus = getExpirationStatus(expiryDate);

        const handleReturn = () => {
            window.location.href = '/';
        };

        return (
            <Card
                className={`food-card ${className}`}
                image={image}
                title={title}
                subtitle={
                    <div className="flex items-center space-x-2">
                        <span className={`badge badge-${expirationStatus.status}`}>
                            {expirationStatus.label}
                        </span>
                        <span className="text-gray-500">
                            {formatDate(expiryDate)}
                        </span>
                    </div>
                }
                footer={
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Avatar src={donor.avatar} size="sm" />
                            <span className="text-sm text-gray-600">{donor.name}</span>
                        </div>
                        <div className="flex space-x-2">
                            {type === 'donation' ? (
                                <Button
                                    variant="primary"
                                    size="sm"
                                    onClick={() => onClaim(food)}
                                >
                                    Claim
                                </Button>
                            ) : (
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    onClick={() => onTrade(food)}
                                >
                                    Trade
                                </Button>
                            )}
                            {showReturnButton && (
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    onClick={handleReturn}
                                >
                                    Return to Site
                                </Button>
                            )}
                        </div>
                    </div>
                }
            >
                <div className="space-y-2">
                    <p className="text-gray-600">{description}</p>
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                            <i className="fas fa-box-open text-gray-400 mr-2"></i>
                            <span>{quantity} {unit}</span>
                        </div>
                        <div className="flex items-center">
                            <i className="fas fa-map-marker-alt text-gray-400 mr-2"></i>
                            <span>{location}</span>
                        </div>
                    </div>
                </div>
            </Card>
        );
    } catch (error) {
        console.error('FoodCard component error:', error);
        reportError(error);
        return null;
    }
}
