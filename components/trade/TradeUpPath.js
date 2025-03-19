function TradeUpPath({ currentItem, targetItem, onSelectStep }) {
    try {
        const [loading, setLoading] = React.useState(false);
        const [tradePath, setTradePath] = React.useState(null);
        const [error, setError] = React.useState(null);

        React.useEffect(() => {
            if (currentItem && targetItem) {
                calculatePath();
            }
        }, [currentItem, targetItem]);

        const calculatePath = async () => {
            setLoading(true);
            try {
                const path = await calculateTradeUpPath(currentItem, targetItem);
                setTradePath(path);
                setError(null);
            } catch (error) {
                console.error('Calculate trade path error:', error);
                setError('Failed to calculate trade path');
            } finally {
                setLoading(false);
            }
        };

        if (loading) {
            return (
                <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Calculating optimal trade path...</p>
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
                        onClick={calculatePath}
                    >
                        Try Again
                    </Button>
                </div>
            );
        }

        if (!tradePath) {
            return null;
        }

        return (
            <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <p className="text-sm text-gray-500">Current Value</p>
                            <p className="text-lg font-semibold">${tradePath.currentValue}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Target Value</p>
                            <p className="text-lg font-semibold">${tradePath.targetValue}</p>
                        </div>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Estimated Steps</p>
                        <p className="text-lg font-semibold">{tradePath.estimatedSteps} trades</p>
                    </div>
                </div>

                <div className="space-y-4">
                    {tradePath.tradePath.map((step, index) => (
                        <div 
                            key={index}
                            className="bg-white rounded-lg shadow-sm p-4 cursor-pointer hover:shadow-md transition-shadow"
                            onClick={() => onSelectStep(step)}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                        <span className="text-green-600 font-medium">{step.step}</span>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="font-medium">{step.tradeFor}</h3>
                                        <p className="text-sm text-gray-500">
                                            Value: ${step.estimatedValue} (+${step.valueIncrease})
                                        </p>
                                    </div>
                                </div>
                                <i className="fas fa-chevron-right text-gray-400"></i>
                            </div>
                            <p className="mt-2 text-sm text-gray-600">{step.strategy}</p>
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <Button
                        variant="primary"
                        onClick={() => window.location.href = '/trading'}
                    >
                        Start Trading
                    </Button>
                </div>
            </div>
        );
    } catch (error) {
        console.error('TradeUpPath component error:', error);
        reportError(error);
        return null;
    }
}
