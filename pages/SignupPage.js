function SignupPage() {
    try {
        const [formData, setFormData] = React.useState({
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            accountType: 'individual',
            agreeToTerms: false
        });

        const [errors, setErrors] = React.useState({});
        const [loading, setLoading] = React.useState(false);
        const [showPassword, setShowPassword] = React.useState(false);
        const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

        React.useEffect(() => {
            // Initialize database when component mounts
            initializeDatabase().catch(error => {
                console.error('Database initialization error:', error);
                setErrors(prev => ({
                    ...prev,
                    form: 'Failed to initialize database. Please try again.'
                }));
            });
        }, []);

        const handleChange = (e) => {
            const { name, value, type, checked } = e.target;
            setFormData(prev => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            }));

            // Clear error when field is modified
            if (errors[name]) {
                setErrors(prev => ({
                    ...prev,
                    [name]: null
                }));
            }
        };

        const validateForm = () => {
            const newErrors = {};

            if (!formData.name.trim()) newErrors.name = 'Name is required';
            if (!formData.email.trim()) newErrors.email = 'Email is required';
            if (!formData.password) newErrors.password = 'Password is required';
            if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = 'Passwords do not match';
            }
            if (!formData.agreeToTerms) {
                newErrors.agreeToTerms = 'You must agree to the terms and conditions';
            }

            setErrors(newErrors);
            return Object.keys(newErrors).length === 0;
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            
            if (!validateForm()) {
                return;
            }

            setLoading(true);
            
            try {
                // Check if email already exists
                const users = await db.getAll(db.STORES.users);
                const existingUser = users.find(user => user.email === formData.email);
                
                if (existingUser) {
                    setErrors({
                        email: 'This email is already registered'
                    });
                    return;
                }

                // Create new user
                const userData = {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password, // In real app, this should be hashed
                    accountType: formData.accountType,
                    role: 'user',
                    status: 'active',
                    joinDate: new Date().toISOString(),
                    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=random`
                };

                await db.add(db.STORES.users, userData);
                
                // Set user authentication
                localStorage.setItem('userAuthenticated', 'true');
                localStorage.setItem('currentUser', JSON.stringify(userData));

                // Redirect to home page
                window.location.href = '/';
            } catch (error) {
                console.error('Signup error:', error);
                setErrors({
                    form: 'Failed to create account. Please try again.'
                });
            } finally {
                setLoading(false);
            }
        };

        const togglePasswordVisibility = (field) => {
            if (field === 'password') {
                setShowPassword(!showPassword);
            } else {
                setShowConfirmPassword(!showConfirmPassword);
            }
        };

        const handleBackToSite = () => {
            window.location.href = '/';
        };

        return (
            <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
                <div className="absolute top-4 left-4">
                    <button
                        onClick={handleBackToSite}
                        className="inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-200 bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:bg-gray-100 px-3 py-1.5 text-sm cursor-pointer"
                    >
                        <i className="fas fa-arrow-left mr-2"></i>
                        Return to Site
                    </button>
                </div>

                <div className="max-w-md mx-auto">
                    <div className="text-center mb-8">
                        <div className="flex justify-center mb-4">
                            <div className="h-12 w-12 bg-green-600 rounded-full flex items-center justify-center">
                                <i className="fas fa-seedling text-white text-2xl"></i>
                            </div>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900">Join ShareFoods</h1>
                        <p className="mt-2 text-gray-600">
                            Create your account and start sharing food with your community
                        </p>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                        {errors.form && (
                            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg">
                                <p>{errors.form}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                                    placeholder="John Doe"
                                />
                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email Address <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                                    placeholder="johndoe@example.com"
                                />
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                    Password <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={formData.password}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                                        placeholder="At least 8 characters"
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        onClick={() => togglePasswordVisibility('password')}
                                    >
                                        <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-gray-400`}></i>
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                    Confirm Password <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                                        placeholder="Confirm your password"
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        onClick={() => togglePasswordVisibility('confirmPassword')}
                                    >
                                        <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'} text-gray-400`}></i>
                                    </button>
                                </div>
                                {errors.confirmPassword && (
                                    <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="accountType" className="block text-sm font-medium text-gray-700 mb-1">
                                    Account Type
                                </label>
                                <select
                                    id="accountType"
                                    name="accountType"
                                    value={formData.accountType}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                                >
                                    <option value="individual">Individual</option>
                                    <option value="business">Business</option>
                                    <option value="nonprofit">Non-profit Organization</option>
                                </select>
                            </div>

                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input
                                        id="agreeToTerms"
                                        name="agreeToTerms"
                                        type="checkbox"
                                        checked={formData.agreeToTerms}
                                        onChange={handleChange}
                                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="agreeToTerms" className="text-gray-700">
                                        I agree to the <a href="/terms" className="text-green-600 hover:text-green-500">Terms of Service</a> and <a href="/privacy" className="text-green-600 hover:text-green-500">Privacy Policy</a>
                                    </label>
                                    {errors.agreeToTerms && (
                                        <p className="mt-1 text-sm text-red-500">{errors.agreeToTerms}</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center"
                                >
                                    {loading ? (
                                        <div className="flex items-center">
                                            <i className="fas fa-spinner fa-spin mr-2"></i>
                                            Creating account...
                                        </div>
                                    ) : (
                                        'Sign Up'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="text-center">
                        <p className="text-gray-600">
                            Already have an account?{' '}
                            <a href="/login" className="text-green-600 hover:text-green-500 font-medium">
                                Sign in
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('SignupPage error:', error);
        reportError(error);
        return null;
    }
}
