function StorageTipCard({ foodItem, tips }) {
    try {
        return (
            <div data-name="storage-tip-card" className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
                <div className="bg-green-50 px-4 py-3 border-b border-green-100">
                    <h3 className="font-medium text-green-800">
                        Storage Tips for {foodItem}
                    </h3>
                </div>
                <div className="p-4">
                    <ul className="space-y-2">
                        {tips.map((tip, index) => (
                            <li key={index} className="flex items-start">
                                <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                                <span className="text-gray-700">{tip}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    } catch (error) {
        console.error('StorageTipCard component error:', error);
        reportError(error);
        return null;
    }
}
