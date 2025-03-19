function TradeList({
    trades,
    onAccept,
    onDecline,
    onComplete,
    loading = false,
    error = null
}) {
    try {
        if (loading) {
            return (
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className="animate-pulse bg-gray-200 rounded-lg h-48"
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

        if (!trades?.length) {
            return (
                <div className="text-center py-8">
                    <i className="fas fa-handshake text-gray-400 text-4xl mb-4"></i>
                    <p className="text-gray-600">No trades available</p>
                </div>
            );
        }

        return (
            <div data-name="trade-list" className="space-y-4">
                {trades.map((trade) => (
                    <TradeCard
                        key={trade.objectId}
                        trade={trade}
                        onAccept={onAccept}
                        onDecline={onDecline}
                        onComplete={onComplete}
                    />
                ))}
            </div>
        );
    } catch (error) {
        console.error('TradeList component error:', error);
        reportError(error);
        return null;
    }
}
