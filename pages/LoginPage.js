function LoginPage() {
    try {
        const [formData, setFormData] = React.useState({
            email: '',
            password: '',
            rememberMe: false
        });

        const [loading, setLoading] = React.useState(false);
        const [error, setError] = React.useState(null);
        const [showPassword, setShowPassword] = React.useState(false);

        React.useEffect(() => {
            // Initialize database when component mounts
            initializeDatabase().catch(error => {
                console.error('Database initialization error:', error);
                setError('Failed to initialize database. Please try again.');
            });
        }, []);

        const handleChange = (e) => {
            const { name, value, type, checked } = e.target;
            setFormData(prev => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            }));

            // Clear error when field is modified
            if (error) {
                setError(null);
            }
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            setLoading(true);
            setError(null);
            
            try {
                const { email, password } = formData;
                
                // Get all users from database
                const users = await db.getAll(db.STORES.users);
                
                // Find user with matching email and password
                const user = users.find(u => u.email === email && u.password === password);
                
                if (user) {
                    // Set user authentication in localStorage
                    localStorage.setItem('userAuthenticated', 'true');
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    
                    // Set admin authentication if applicable
                    if (user.role === 'admin') {
                        localStorage.setItem('adminAuthenticated', 'true');
                        localStorage.setItem('adminUser', JSON.stringify(user));
                        window.location.href = '/admin';
                    } else {
                        window.location.href = '/profile';
                    }
                } else {
                    setError('Invalid email or password');
                }
            } catch (error) {
                console.error('Login error:', error);
                setError('An error occurred during login. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        const togglePasswordVisibility = () => {
            setShowPassword(!showPassword);
        };

        const handleBackToSite = () => {
            window.location.href = '/';
        };

        return (
            <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="absolute top-4 left-4">
                    <button
                        onClick={handleBackToSite}
                        className="inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-200 bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:bg-gray-100 px-3 py-1.5 text-sm cursor-pointer"
                    >
                        <i className="fas fa-arrow-left mr-2"></i>
                        Return to Site
                    </button>
                </div>

                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="flex justify-center">
                        <div className="h-12 w-12 bg-green-600 rounded-full flex items-center justify-center">
                            <i className="fas fa-seedling text-white text-2xl"></i>
                        </div>
                    </div>
                    <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
                        Sign in to ShareFoods
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Sign in to your ShareFoods account
                    </p>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                        {error && (
                            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg">
                                <p>{error}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        onClick={togglePasswordVisibility}
                                    >
                                        <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-gray-400`}></i>
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="rememberMe"
                                        name="rememberMe"
                                        type="checkbox"
                                        checked={formData.rememberMe}
                                        onChange={handleChange}
                                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                                        Remember me
                                    </label>
                                </div>
                                <a href="/forgot-password" className="text-sm text-green-600 hover:text-green-500">
                                    Forgot password?
                                </a>
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
                                            Signing in...
                                        </div>
                                    ) : (
                                        'Sign In'
                                    )}
                                </button>
                            </div>
                        </form>

                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">Demo Credentials</span>
                                </div>
                            </div>

                            <div className="mt-6">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-sm text-gray-600">Email: admin@sharefoods.com</p>
                                    <p className="text-sm text-gray-600">Password: admin123</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 text-center">
                            <p className="text-gray-600">
                                Don't have an account?{' '}
                                <a href="/signup" className="text-green-600 hover:text-green-500 font-medium">
                                    Sign up
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('LoginPage error:', error);
        reportError(error);
        return null;
    }
}
