function TradeFairnessIndicator({ offeredItem, requestedItem }) {
    try {
        const [loading, setLoading] = React.useState(false);
        const [analysis, setAnalysis] = React.useState(null);
        const [error, setError] = React.useState(null);

        React.useEffect(() => {
            if (offeredItem && requestedItem) {
                analyzeTradeValue();
            }
        }, [offeredItem, requestedItem]);

        const analyzeTradeValue = async () => {
            setLoading(true);
            try {
                const result = await analyzeTradeFairness(offeredItem, requestedItem);
                setAnalysis(result);
                setError(null);
            } catch (error) {
                console.error('Trade analysis error:', error);
                setError('Failed to analyze trade fairness');
            } finally {
                setLoading(false);
            }
        };

        if (loading) {
            return (
                <div className="flex items-center justify-center p-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-green-500"></div>
                    <span className="ml-2 text-sm text-gray-600">Analyzing trade...</span>
                </div>
            );
        }

        if (error) {
            return (
                <div className="text-center p-4">
                    <p className="text-sm text-red-600">{error}</p>
                </div>
            );
        }

        if (!analysis) {
            return null;
        }

        return (
            <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium">Trade Fairness Analysis</h3>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                        analysis.fairnessScore >= 70 ? 'bg-green-100 text-green-800' :
                        analysis.fairnessScore >= 40 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                    }`}>
                        {analysis.recommendation}
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="bg-white rounded p-3">
                        <div className="flex justify-between mb-2">
                            <span className="text-sm text-gray-600">Fairness Score</span>
                            <span className="font-medium">{analysis.fairnessScore}/100</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                                className={`rounded-full h-2 ${
                                    analysis.fairnessScore >= 70 ? 'bg-green-500' :
                                    analysis.fairnessScore >= 40 ? 'bg-yellow-500' :
                                    'bg-red-500'
                                }`}
                                style={{ width: `${analysis.fairnessScore}%` }}
                            ></div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white rounded p-3">
                            <p className="text-sm text-gray-600 mb-1">Offered Value</p>
                            <p className="font-medium">${analysis.valueComparison.offeredValue}</p>
                        </div>
                        <div className="bg-white rounded p-3">
                            <p className="text-sm text-gray-600 mb-1">Requested Value</p>
                            <p className="font-medium">${analysis.valueComparison.requestedValue}</p>
                        </div>
                    </div>

                    {analysis.adjustmentSuggestions.length > 0 && (
                        <div className="bg-white rounded p-3">
                            <p className="text-sm font-medium mb-2">Suggestions for Fair Trade</p>
                            <ul className="space-y-1">
                                {analysis.adjustmentSuggestions.map((suggestion, index) => (
                                    <li key={index} className="text-sm text-gray-600">
                                        • {suggestion}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="bg-white rounded p-3">
                        <p className="text-sm text-gray-600">{analysis.analysis}</p>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('TradeFairnessIndicator component error:', error);
        reportError(error);
        return null;
    }
}
