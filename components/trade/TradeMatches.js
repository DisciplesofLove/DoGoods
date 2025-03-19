function TradeMatches({ item, onSelectMatch }) {
    try {
        const [loading, setLoading] = React.useState(false);
        const [matches, setMatches] = React.useState(null);
        const [error, setError] = React.useState(null);
        const [activeTab, setActiveTab] = React.useState('direct');

        React.useEffect(() => {
            if (item) {
                findMatches();
            }
        }, [item]);

        const findMatches = async () => {
            setLoading(true);
            try {
                const matchResults = await findTradeMatches(item);
                setMatches(matchResults);
                setError(null);
            } catch (error) {
                console.error('Find matches error:', error);
                setError('Failed to find trade matches');
            } finally {
                setLoading(false);
            }
        };

        if (loading) {
            return (
                <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Finding potential trades...</p>
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
                        onClick={findMatches}
                    >
                        Try Again
                    </Button>
                </div>
            );
        }

        if (!matches) {
            return null;
        }

        return (
            <div className="space-y-6">
                <div className="flex space-x-2">
                    <button
                        onClick={() => setActiveTab('direct')}
                        className={`px-4 py-2 rounded-lg ${
                            activeTab === 'direct' 
                                ? 'bg-green-600 text-white' 
                                : 'bg-gray-100 text-gray-600'
                        }`}
                    >
                        Direct Matches
                    </button>
                    <button
                        onClick={() => setActiveTab('tradeup')}
                        className={`px-4 py-2 rounded-lg ${
                            activeTab === 'tradeup' 
                                ? 'bg-green-600 text-white' 
                                : 'bg-gray-100 text-gray-600'
                        }`}
                    >
                        Trade-Up Options
                    </button>
                </div>

                <div className="space-y-4">
                    {activeTab === 'direct' ? (
                        matches.directMatches.length > 0 ? (
                            matches.directMatches.map((match, index) => (
                                <div 
                                    key={index}
                                    className="bg-white rounded-lg shadow-sm p-4 cursor-pointer hover:shadow-md transition-shadow"
                                    onClick={() => onSelectMatch(match)}
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-medium">{match.item}</h3>
                                            <p className="text-sm text-gray-600 mt-1">{match.description}</p>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm font-medium">${match.estimatedValue}</div>
                                            <div className="text-xs text-gray-500">Match Score: {match.matchScore}%</div>
                                        </div>
                                    </div>
                                    <p className="mt-2 text-sm text-green-600">{match.reason}</p>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8">
                                <p className="text-gray-600">No direct matches found</p>
                            </div>
                        )
                    ) : (
                        matches.tradeUpSuggestions.length > 0 ? (
                            matches.tradeUpSuggestions.map((suggestion, index) => (
                                <div 
                                    key={index}
                                    className="bg-white rounded-lg shadow-sm p-4 cursor-pointer hover:shadow-md transition-shadow"
                                    onClick={() => onSelectMatch(suggestion)}
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-medium">{suggestion.item}</h3>
                                            <p className="text-sm text-gray-600 mt-1">{suggestion.description}</p>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm font-medium">${suggestion.estimatedValue}</div>
                                            <div className="text-xs text-green-600">+${suggestion.stepValue}</div>
                                        </div>
                                    </div>
                                    <p className="mt-2 text-sm text-green-600">{suggestion.reason}</p>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8">
                                <p className="text-gray-600">No trade-up suggestions found</p>
                            </div>
                        )
                    )}
                </div>
            </div>
        );
    } catch (error) {
        console.error('TradeMatches component error:', error);
        reportError(error);
        return null;
    }
}
