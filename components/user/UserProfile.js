function UserProfile({
    user,
    onUpdate,
    loading = false
}) {
    try {
        const [isEditing, setIsEditing] = React.useState(false);
        const [formData, setFormData] = React.useState({
            name: '',
            email: '',
            phone: '',
            organization: '',
            bio: '',
            location: '',
            avatar: null,
            ...user
        });

        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        };

        const handleAvatarChange = (e) => {
            const file = e.target.files[0];
            if (file && file.type.startsWith('image/')) {
                setFormData(prev => ({
                    ...prev,
                    avatar: file
                }));
            }
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                await onUpdate(formData);
                setIsEditing(false);
            } catch (error) {
                console.error('Profile update error:', error);
            }
        };

        return (
            <div data-name="user-profile" className="bg-white rounded-lg shadow-sm">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">Profile</h2>
                        <Button
                            variant={isEditing ? 'secondary' : 'primary'}
                            onClick={() => setIsEditing(!isEditing)}
                        >
                            {isEditing ? 'Cancel' : 'Edit Profile'}
                        </Button>
                    </div>

                    {isEditing ? (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="flex items-center space-x-4 mb-6">
                                <Avatar
                                    src={formData.avatar instanceof File ? 
                                        URL.createObjectURL(formData.avatar) : 
                                        formData.avatar
                                    }
                                    size="xl"
                                />
                                <Input
                                    type="file"
                                    name="avatar"
                                    onChange={handleAvatarChange}
                                    accept="image/*"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input
                                    label="Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />

                                <Input
                                    label="Email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />

                                <Input
                                    label="Phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />

                                <Input
                                    label="Organization"
                                    name="organization"
                                    value={formData.organization}
                                    onChange={handleChange}
                                />

                                <Input
                                    label="Location"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    icon={<i className="fas fa-map-marker-alt"></i>}
                                />

                                <div className="md:col-span-2">
                                    <Input
                                        label="Bio"
                                        name="bio"
                                        type="textarea"
                                        value={formData.bio}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end space-x-4">
                                <Button
                                    type="submit"
                                    disabled={loading}
                                >
                                    {loading ? 'Saving...' : 'Save Changes'}
                                </Button>
                            </div>
                        </form>
                    ) : (
                        <div className="space-y-6">
                            <div className="flex items-center space-x-4">
                                <Avatar src={user.avatar} size="xl" />
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900">
                                        {user.name}
                                    </h3>
                                    {user.organization && (
                                        <p className="text-gray-500">{user.organization}</p>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500">Email</h4>
                                    <p className="mt-1">{user.email}</p>
                                </div>

                                {user.phone && (
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-500">Phone</h4>
                                        <p className="mt-1">{user.phone}</p>
                                    </div>
                                )}

                                {user.location && (
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-500">Location</h4>
                                        <p className="mt-1">
                                            <i className="fas fa-map-marker-alt text-gray-400 mr-2"></i>
                                            {user.location}
                                        </p>
                                    </div>
                                )}

                                {user.bio && (
                                    <div className="md:col-span-2">
                                        <h4 className="text-sm font-medium text-gray-500">Bio</h4>
                                        <p className="mt-1">{user.bio}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    } catch (error) {
        console.error('UserProfile component error:', error);
        reportError(error);
        return null;
    }
}
