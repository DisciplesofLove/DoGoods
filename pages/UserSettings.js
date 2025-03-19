function UserSettings() {
    try {
        const [loading, setLoading] = React.useState(false);
        const [user, setUser] = React.useState(null);
        const [error, setError] = React.useState(null);

        React.useEffect(() => {
            loadUserData();
        }, []);

        const loadUserData = async () => {
            try {
                const userData = localStorage.getItem('currentUser');
                if (userData) {
                    setUser(JSON.parse(userData));
                } else {
                    throw new Error('User data not found');
                }
            } catch (error) {
                console.error('Load user data error:', error);
                setError('Failed to load user data');
            }
        };

        const handleSaveSettings = async (section) => {
            setLoading(true);
            try {
                await new Promise(resolve => setTimeout(resolve, 1000));
                alert(`${section} settings saved successfully`);
            } catch (error) {
                console.error('Save settings error:', error);
                setError('Failed to save settings');
            } finally {
                setLoading(false);
            }
        };

        if (!user) {
            return (
                <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading user settings...</p>
                </div>
            );
        }

        return (
            <div className="max-w-4xl mx-auto py-8 px-4">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>

                {error && (
                    <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
                        {error}
                    </div>
                )}

                <div className="space-y-6">
                    {/* Account Settings */}
                    <Card>
                        <div className="p-6">
                            <h2 className="text-xl font-semibold mb-6">Account Settings</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input
                                    label="Email"
                                    value={user.email}
                                    disabled
                                />
                                <Input
                                    label="Display Name"
                                    value={user.name}
                                    onChange={() => {}}
                                />
                            </div>
                            <div className="mt-6 flex justify-end">
                                <Button
                                    variant="primary"
                                    onClick={() => handleSaveSettings('account')}
                                    disabled={loading}
                                >
                                    Save Changes
                                </Button>
                            </div>
                        </div>
                    </Card>

                    {/* Notification Settings */}
                    <Card>
                        <div className="p-6">
                            <h2 className="text-xl font-semibold mb-6">Notification Settings</h2>
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="emailNotifications"
                                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="emailNotifications" className="ml-2 block text-sm text-gray-900">
                                        Email Notifications
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="pushNotifications"
                                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="pushNotifications" className="ml-2 block text-sm text-gray-900">
                                        Push Notifications
                                    </label>
                                </div>
                            </div>
                            <div className="mt-6 flex justify-end">
                                <Button
                                    variant="primary"
                                    onClick={() => handleSaveSettings('notifications')}
                                    disabled={loading}
                                >
                                    Save Changes
                                </Button>
                            </div>
                        </div>
                    </Card>

                    {/* Privacy Settings */}
                    <Card>
                        <div className="p-6">
                            <h2 className="text-xl font-semibold mb-6">Privacy Settings</h2>
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="profileVisibility"
                                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="profileVisibility" className="ml-2 block text-sm text-gray-900">
                                        Make profile visible to other users
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="locationSharing"
                                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="locationSharing" className="ml-2 block text-sm text-gray-900">
                                        Share location with food listings
                                    </label>
                                </div>
                            </div>
                            <div className="mt-6 flex justify-end">
                                <Button
                                    variant="primary"
                                    onClick={() => handleSaveSettings('privacy')}
                                    disabled={loading}
                                >
                                    Save Changes
                                </Button>
                            </div>
                        </div>
                    </Card>

                    {/* Danger Zone */}
                    <Card>
                        <div className="p-6">
                            <h2 className="text-xl font-semibold mb-6 text-red-600">Danger Zone</h2>
                            <div className="space-y-4">
                                <Button
                                    variant="danger"
                                    onClick={() => {
                                        if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                                            // Handle account deletion
                                        }
                                    }}
                                >
                                    Delete Account
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        );
    } catch (error) {
        console.error('UserSettings error:', error);
        reportError(error);
        return null;
    }
}
