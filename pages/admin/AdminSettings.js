function AdminSettings() {
    try {
        const [loading, setLoading] = React.useState(false);
        const [success, setSuccess] = React.useState(null);
        const [error, setError] = React.useState(null);
        const [settings, setSettings] = React.useState({
            general: {
                siteName: 'ShareFoods',
                siteDescription: 'A community-driven platform designed to reduce food waste and combat hunger by connecting individuals, businesses, and organizations.',
                contactEmail: 'contact@sharefoods.com',
                supportPhone: '(123) 456-7890'
            },
            notifications: {
                enableEmailNotifications: true,
                enablePushNotifications: false,
                adminAlertEmails: 'admin@sharefoods.com,alerts@sharefoods.com',
                dailyDigest: true,
                weeklyReport: true
            },
            listings: {
                requireApproval: false,
                maxImagesPerListing: 5,
                maxActiveDaysDefault: 7,
                allowedCategories: 'produce,dairy,bakery,pantry,meat,prepared',
                enableFoodSafetyGuidelines: true
            },
            users: {
                requireEmailVerification: true,
                allowGuestBrowsing: true,
                defaultUserRole: 'user',
                accountDeletionPolicy: 'soft-delete'
            },
            privacy: {
                dataRetentionDays: 180,
                showUserProfiles: true,
                maskUserContact: true,
                allowLocationSharing: true
            }
        });

        const handleInputChange = (section, field, value) => {
            setSettings(prev => ({
                ...prev,
                [section]: {
                    ...prev[section],
                    [field]: value
                }
            }));
        };

        const handleCheckboxChange = (section, field) => {
            setSettings(prev => ({
                ...prev,
                [section]: {
                    ...prev[section],
                    [field]: !prev[section][field]
                }
            }));
        };

        const handleSaveSettings = async (section) => {
            setLoading(true);
            setSuccess(null);
            setError(null);
            
            try {
                // In a real app, this would be an API call
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                setSuccess(`${section.charAt(0).toUpperCase() + section.slice(1)} settings saved successfully`);
                
                // Clear success message after 3 seconds
                setTimeout(() => setSuccess(null), 3000);
            } catch (err) {
                console.error('Save settings error:', err);
                setError('Failed to save settings. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        return (
            <AdminLayout active="settings">
                <div data-name="admin-settings" className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
                        <p className="mt-2 text-gray-600">
                            Configure platform settings and preferences
                        </p>
                    </div>

                    {success && (
                        <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded relative">
                            <span className="block sm:inline">{success}</span>
                        </div>
                    )}
                    
                    {error && (
                        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}

                    <div className="space-y-6">
                        {/* General Settings */}
                        <Card>
                            <div className="p-6">
                                <h2 className="text-lg font-semibold mb-6">General Settings</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Site Name
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                            value={settings.general.siteName}
                                            onChange={(e) => handleInputChange('general', 'siteName', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Contact Email
                                        </label>
                                        <input
                                            type="email"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                            value={settings.general.contactEmail}
                                            onChange={(e) => handleInputChange('general', 'contactEmail', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Support Phone
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                            value={settings.general.supportPhone}
                                            onChange={(e) => handleInputChange('general', 'supportPhone', e.target.value)}
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Site Description
                                        </label>
                                        <textarea
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                            rows="3"
                                            value={settings.general.siteDescription}
                                            onChange={(e) => handleInputChange('general', 'siteDescription', e.target.value)}
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="mt-6 flex justify-end">
                                    <Button
                                        variant="primary"
                                        onClick={() => handleSaveSettings('general')}
                                        disabled={loading}
                                    >
                                        {loading ? 'Saving...' : 'Save Settings'}
                                    </Button>
                                </div>
                            </div>
                        </Card>

                        {/* Notification Settings */}
                        <Card>
                            <div className="p-6">
                                <h2 className="text-lg font-semibold mb-6">Notification Settings</h2>
                                <div className="space-y-4">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input
                                                id="enableEmailNotifications"
                                                type="checkbox"
                                                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                                checked={settings.notifications.enableEmailNotifications}
                                                onChange={() => handleCheckboxChange('notifications', 'enableEmailNotifications')}
                                            />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label htmlFor="enableEmailNotifications" className="font-medium text-gray-700">Enable Email Notifications</label>
                                            <p className="text-gray-500">Send email notifications to users for important updates</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input
                                                id="enablePushNotifications"
                                                type="checkbox"
                                                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                                checked={settings.notifications.enablePushNotifications}
                                                onChange={() => handleCheckboxChange('notifications', 'enablePushNotifications')}
                                            />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label htmlFor="enablePushNotifications" className="font-medium text-gray-700">Enable Push Notifications</label>
                                            <p className="text-gray-500">Send push notifications to users with the mobile app</p>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Admin Alert Emails (comma separated)
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                            value={settings.notifications.adminAlertEmails}
                                            onChange={(e) => handleInputChange('notifications', 'adminAlertEmails', e.target.value)}
                                        />
                                    </div>
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input
                                                id="dailyDigest"
                                                type="checkbox"
                                                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                                checked={settings.notifications.dailyDigest}
                                                onChange={() => handleCheckboxChange('notifications', 'dailyDigest')}
                                            />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label htmlFor="dailyDigest" className="font-medium text-gray-700">Send Daily Digest</label>
                                            <p className="text-gray-500">Send a daily summary of platform activity to admins</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6 flex justify-end">
                                    <Button
                                        variant="primary"
                                        onClick={() => handleSaveSettings('notifications')}
                                        disabled={loading}
                                    >
                                        {loading ? 'Saving...' : 'Save Settings'}
                                    </Button>
                                </div>
                            </div>
                        </Card>

                        {/* Listing Settings */}
                        <Card>
                            <div className="p-6">
                                <h2 className="text-lg font-semibold mb-6">Listing Settings</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input
                                                id="requireApproval"
                                                type="checkbox"
                                                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                                checked={settings.listings.requireApproval}
                                                onChange={() => handleCheckboxChange('listings', 'requireApproval')}
                                            />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label htmlFor="requireApproval" className="font-medium text-gray-700">Require Approval</label>
                                            <p className="text-gray-500">Require admin approval before listings go live</p>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Max Images Per Listing
                                        </label>
                                        <input
                                            type="number"
                                            min="1"
                                            max="10"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                            value={settings.listings.maxImagesPerListing}
                                            onChange={(e) => handleInputChange('listings', 'maxImagesPerListing', parseInt(e.target.value))}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Default Active Days
                                        </label>
                                        <input
                                            type="number"
                                            min="1"
                                            max="30"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                            value={settings.listings.maxActiveDaysDefault}
                                            onChange={(e) => handleInputChange('listings', 'maxActiveDaysDefault', parseInt(e.target.value))}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Allowed Categories (comma separated)
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                            value={settings.listings.allowedCategories}
                                            onChange={(e) => handleInputChange('listings', 'allowedCategories', e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="mt-6 flex justify-end">
                                    <Button
                                        variant="primary"
                                        onClick={() => handleSaveSettings('listings')}
                                        disabled={loading}
                                    >
                                        {loading ? 'Saving...' : 'Save Settings'}
                                    </Button>
                                </div>
                            </div>
                        </Card>

                        {/* User Settings */}
                        <Card>
                            <div className="p-6">
                                <h2 className="text-lg font-semibold mb-6">User Settings</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input
                                                id="requireEmailVerification"
                                                type="checkbox"
                                                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                                checked={settings.users.requireEmailVerification}
                                                onChange={() => handleCheckboxChange('users', 'requireEmailVerification')}
                                            />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label htmlFor="requireEmailVerification" className="font-medium text-gray-700">Require Email Verification</label>
                                            <p className="text-gray-500">Users must verify their email before using the platform</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input
                                                id="allowGuestBrowsing"
                                                type="checkbox"
                                                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                                checked={settings.users.allowGuestBrowsing}
                                                onChange={() => handleCheckboxChange('users', 'allowGuestBrowsing')}
                                            />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label htmlFor="allowGuestBrowsing" className="font-medium text-gray-700">Allow Guest Browsing</label>
                                            <p className="text-gray-500">Allow non-registered users to browse available listings</p>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Default User Role
                                        </label>
                                        <select
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                            value={settings.users.defaultUserRole}
                                            onChange={(e) => handleInputChange('users', 'defaultUserRole', e.target.value)}
                                        >
                                            <option value="user">User</option>
                                            <option value="contributor">Contributor</option>
                                            <option value="moderator">Moderator</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Account Deletion Policy
                                        </label>
                                        <select
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                            value={settings.users.accountDeletionPolicy}
                                            onChange={(e) => handleInputChange('users', 'accountDeletionPolicy', e.target.value)}
                                        >
                                            <option value="soft-delete">Soft Delete (Anonymize)</option>
                                            <option value="hard-delete">Hard Delete (Complete Removal)</option>
                                            <option value="archive">Archive (Preserve Data)</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="mt-6 flex justify-end">
                                    <Button
                                        variant="primary"
                                        onClick={() => handleSaveSettings('users')}
                                        disabled={loading}
                                    >
                                        {loading ? 'Saving...' : 'Save Settings'}
                                    </Button>
                                </div>
                            </div>
                        </Card>

                        {/* Privacy Settings */}
                        <Card>
                            <div className="p-6">
                                <h2 className="text-lg font-semibold mb-6">Privacy Settings</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Data Retention Period (days)
                                        </label>
                                        <input
                                            type="number"
                                            min="30"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                            value={settings.privacy.dataRetentionDays}
                                            onChange={(e) => handleInputChange('privacy', 'dataRetentionDays', parseInt(e.target.value))}
                                        />
                                    </div>
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input
                                                id="showUserProfiles"
                                                type="checkbox"
                                                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                                checked={settings.privacy.showUserProfiles}
                                                onChange={() => handleCheckboxChange('privacy', 'showUserProfiles')}
                                            />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label htmlFor="showUserProfiles" className="font-medium text-gray-700">Show User Profiles</label>
                                            <p className="text-gray-500">Allow users to view other users' profiles</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input
                                                id="maskUserContact"
                                                type="checkbox"
                                                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                                checked={settings.privacy.maskUserContact}
                                                onChange={() => handleCheckboxChange('privacy', 'maskUserContact')}
                                            />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label htmlFor="maskUserContact" className="font-medium text-gray-700">Mask User Contact Info</label>
                                            <p className="text-gray-500">Hide user contact information until explicitly shared</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input
                                                id="allowLocationSharing"
                                                type="checkbox"
                                                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                                checked={settings.privacy.allowLocationSharing}
                                                onChange={() => handleCheckboxChange('privacy', 'allowLocationSharing')}
                                            />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label htmlFor="allowLocationSharing" className="font-medium text-gray-700">Allow Location Sharing</label>
                                            <p className="text-gray-500">Allow users to share their precise location for listings</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6 flex justify-end">
                                    <Button
                                        variant="primary"
                                        onClick={() => handleSaveSettings('privacy')}
                                        disabled={loading}
                                    >
                                        {loading ? 'Saving...' : 'Save Settings'}
                                    </Button>
                                </div>
                            </div>
                        </Card>

                        {/* System Maintenance */}
                        <Card>
                            <div className="p-6">
                                <h2 className="text-lg font-semibold mb-6">System Maintenance</h2>
                                <div className="space-y-4">
                                    <div>
                                        <Button
                                            variant="secondary"
                                            icon={<i className="fas fa-database"></i>}
                                            onClick={() => alert('Database backup initiated')}
                                        >
                                            Backup Database
                                        </Button>
                                    </div>
                                    <div>
                                        <Button
                                            variant="secondary"
                                            icon={<i className="fas fa-trash-alt"></i>}
                                            onClick={() => alert('Expired listings cleanup initiated')}
                                        >
                                            Clean Up Expired Listings
                                        </Button>
                                    </div>
                                    <div>
                                        <Button
                                            variant="secondary"
                                            icon={<i className="fas fa-broom"></i>}
                                            onClick={() => alert('Cache cleared successfully')}
                                        >
                                            Clear Cache
                                        </Button>
                                    </div>
                                    <div className="pt-4 border-t">
                                        <Button
                                            variant="danger"
                                            icon={<i className="fas fa-exclamation-triangle"></i>}
                                            onClick={() => {
                                                if (confirm('Are you sure? This will put the site in maintenance mode.')) {
                                                    alert('Site is now in maintenance mode');
                                                }
                                            }}
                                        >
                                            Enable Maintenance Mode
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </AdminLayout>
        );
    } catch (error) {
        console.error('AdminSettings error:', error);
        reportError(error);
        return null;
    }
}
