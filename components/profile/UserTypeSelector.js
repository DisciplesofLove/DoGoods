function UserTypeSelector({ currentType, onTypeChange }) {
    try {
        const userTypes = [
            { id: USER_TYPES.USER, label: 'Regular User', description: 'Can claim and trade food' },
            { id: USER_TYPES.DONOR, label: 'Donor', description: 'Can share food and create listings' },
            { id: USER_TYPES.RECIPIENT, label: 'Recipient', description: 'Can claim food from donors' },
            { id: USER_TYPES.VOLUNTEER, label: 'Volunteer', description: 'Can help with food distribution' }
        ];

        return (
            <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Account Type</h3>
                <div className="grid grid-cols-1 gap-4">
                    {userTypes.map((type) => (
                        <div
                            key={type.id}
                            className={`relative rounded-lg border p-4 cursor-pointer hover:border-green-500 ${
                                currentType === type.id ? 'border-green-500 bg-green-50' : 'border-gray-300'
                            }`}
                            onClick={() => onTypeChange(type.id)}
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="text-base font-medium text-gray-900">{type.label}</h4>
                                    <p className="mt-1 text-sm text-gray-500">{type.description}</p>
                                </div>
                                <div className={`h-5 w-5 rounded-full border-2 ${
                                    currentType === type.id
                                        ? 'border-green-500 bg-green-500'
                                        : 'border-gray-300'
                                }`}>
                                    {currentType === type.id && (
                                        <i className="fas fa-check text-white text-xs flex items-center justify-center h-full"></i>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    } catch (error) {
        console.error('UserTypeSelector component error:', error);
        reportError(error);
        return null;
    }
}
