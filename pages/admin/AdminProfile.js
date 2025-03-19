function AdminProfile() {
    try {
        const [profile, setProfile] = React.useState(null);
        const [loading, setLoading] = React.useState(true);
        const [error, setError] = React.useState(null);
        const [isEditing, setIsEditing] = React.useState(false);
        const [editForm, setEditForm] = React.useState({
            name: '',
            email: '',
            phone: '',
            bio: ''
        });

        React.useEffect(() => {
            loadProfile();
        }, []);

        const loadProfile = async () => {
            try {
                const userData = localStorage.getItem('adminUser');
                if (userData) {
                    const user = JSON.parse(userData);
                    setProfile(user);
                    setEditForm({
                        name: user.name || '',
                        email: user.email || '',
                        phone: user.phone || '',
                        bio: user.bio || ''
                    });
                } else {
                    throw new Error('Admin user data not found');
                }
            } catch (error) {
                console.error('Load profile error:', error);
                setError('Failed to load profile');
            } finally {
                setLoading(false);
            }
        };

        const handleEditSubmit = async (e) => {
            e.preventDefault();
            setLoading(true);
            try {
                // Update user in database
                const updatedUser = {
                    ...profile,
                    ...editForm,
                    updatedAt: new Date().toISOString()
                };

                await db.update(db.STORES.users, profile.id, updatedUser);
                
                // Update local storage
                localStorage.setItem('adminUser', JSON.stringify(updatedUser));
                
                setProfile(updatedUser);
                setIsEditing(false);
                alert('Profile updated successfully!');
            } catch (error) {
                console.error('Update profile error:', error);
                alert('Failed to update profile. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        if (loading) {
            return (
                <AdminLayout active="profile">
                    <div className="max-w-4xl mx-auto py-8">
                        <div className="animate-pulse space-y-6">
                            <div className="h-32 bg-gray-200 rounded-lg"></div>
                            <div className="h-64 bg-gray-200 rounded-lg"></div>
                        </div>
                    </div>
                </AdminLayout>
            );
        }

        if (error) {
            return (
                <AdminLayout active="profile">
                    <div className="max-w-4xl mx-auto py-8 text-center">
                        <i className="fas fa-exclamation-circle text-red-500 text-4xl mb-4"></i>
                        <p className="text-gray-600 mb-4">{error}</p>
                        <Button
                            variant="secondary"
                            onClick={loadProfile}
                        >
                            Try Again
                        </Button>
                    </div>
                </AdminLayout>
            );
        }

        return (
            <AdminLayout active="profile">
                <div className="max-w-4xl mx-auto py-8">
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-8">
                                <h1 className="text-2xl font-bold text-gray-900">Admin Profile</h1>
                                {!isEditing && (
                                    <Button
                                        variant="secondary"
                                        icon={<i className="fas fa-edit"></i>}
                                        onClick={() => setIsEditing(true)}
                                    >
                                        Edit Profile
                                    </Button>
                                )}
                            </div>

                            {isEditing ? (
                                <form onSubmit={handleEditSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <Input
                                            label="Name"
                                            name="name"
                                            value={editForm.name}
                                            onChange={(e) => setEditForm(prev => ({
                                                ...prev,
                                                name: e.target.value
                                            }))}
                                            required
                                        />
                                        <Input
                                            label="Email"
                                            name="email"
                                            type="email"
                                            value={editForm.email}
                                            onChange={(e) => setEditForm(prev => ({
                                                ...prev,
                                                email: e.target.value
                                            }))}
                                            required
                                        />
                                        <Input
                                            label="Phone"
                                            name="phone"
                                            value={editForm.phone}
                                            onChange={(e) => setEditForm(prev => ({
                                                ...prev,
                                                phone: e.target.value
                                            }))}
                                        />
                                        <div className="md:col-span-2">
                                            <Input
                                                label="Bio"
                                                name="bio"
                                                type="textarea"
                                                value={editForm.bio}
                                                onChange={(e) => setEditForm(prev => ({
                                                    ...prev,
                                                    bio: e.target.value
                                                }))}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-end space-x-4">
                                        <Button
                                            variant="secondary"
                                            onClick={() => setIsEditing(false)}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            variant="primary"
                                            type="submit"
                                            disabled={loading}
                                        >
                                            {loading ? 'Saving...' : 'Save Changes'}
                                        </Button>
                                    </div>
                                </form>
                            ) : (
                                <div>
                                    <div className="flex items-center mb-8">
                                        <div className="mr-6">
                                            <Avatar
                                                src={profile?.avatar}
                                                size="xl"
                                            />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-semibold">{profile?.name}</h2>
                                            <p className="text-gray-600">{profile?.email}</p>
                                            <p className="text-sm text-gray-500 mt-1">
                                                Role: {profile?.role?.charAt(0).toUpperCase() + profile?.role?.slice(1)}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <h3 className="text-lg font-semibold mb-4">Account Information</h3>
                                            <div className="space-y-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-500">Account ID</label>
                                                    <p className="mt-1">{profile?.id}</p>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-500">Join Date</label>
                                                    <p className="mt-1">{formatDate(profile?.joinDate)}</p>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-500">Last Login</label>
                                                    <p className="mt-1">Today at {new Date().toLocaleTimeString()}</p>
                                                </div>
                                                {profile?.phone && (
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-500">Phone</label>
                                                        <p className="mt-1">{profile.phone}</p>
                                                    </div>
                                                )}
                                                {profile?.bio && (
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-500">Bio</label>
                                                        <p className="mt-1">{profile.bio}</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-semibold mb-4">Security</h3>
                                            <div className="space-y-4">
                                                <Button
                                                    variant="secondary"
                                                    icon={<i className="fas fa-key"></i>}
                                                    onClick={() => alert('Change password functionality coming soon!')}
                                                >
                                                    Change Password
                                                </Button>
                                                <Button
                                                    variant="secondary"
                                                    icon={<i className="fas fa-shield-alt"></i>}
                                                    onClick={() => alert('2FA functionality coming soon!')}
                                                >
                                                    Enable Two-Factor Auth
                                                </Button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-8 pt-8 border-t">
                                        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                                        <div className="space-y-4">
                                            {[
                                                {
                                                    action: 'Approved food listing',
                                                    time: '2 hours ago',
                                                    icon: 'fa-check-circle',
                                                    iconColor: 'text-green-500'
                                                },
                                                {
                                                    action: 'Updated system settings',
                                                    time: '5 hours ago',
                                                    icon: 'fa-cog',
                                                    iconColor: 'text-blue-500'
                                                },
                                                {
                                                    action: 'Reviewed reported content',
                                                    time: 'Yesterday',
                                                    icon: 'fa-flag',
                                                    iconColor: 'text-yellow-500'
                                                }
                                            ].map((activity, index) => (
                                                <div key={index} className="flex items-start">
                                                    <div className={`mt-1 ${activity.iconColor}`}>
                                                        <i className={`fas ${activity.icon}`}></i>
                                                    </div>
                                                    <div className="ml-3">
                                                        <p className="text-gray-900">{activity.action}</p>
                                                        <p className="text-sm text-gray-500">{activity.time}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </AdminLayout>
        );
    } catch (error) {
        console.error('AdminProfile error:', error);
        reportError(error);
        return null;
    }
}
