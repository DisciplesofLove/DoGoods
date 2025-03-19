function Header() {
    try {
        const [isMenuOpen, setIsMenuOpen] = React.useState(false);
        const [currentUser, setCurrentUser] = React.useState(null);
        const [isAuthenticated, setIsAuthenticated] = React.useState(false);
        const [dropdownTimeout, setDropdownTimeout] = React.useState(null);
        const [isDropdownHovered, setIsDropdownHovered] = React.useState(false);

        React.useEffect(() => {
            // Check if user is logged in
            const userAuth = localStorage.getItem('userAuthenticated') === 'true';
            setIsAuthenticated(userAuth);
            
            if (userAuth) {
                const userData = localStorage.getItem('currentUser');
                if (userData) {
                    setCurrentUser(JSON.parse(userData));
                }
            }

            return () => {
                if (dropdownTimeout) {
                    clearTimeout(dropdownTimeout);
                }
            };
        }, []);

        const handleDropdownEnter = () => {
            if (dropdownTimeout) {
                clearTimeout(dropdownTimeout);
            }
            setIsDropdownHovered(true);
        };

        const handleDropdownLeave = () => {
            const timeout = setTimeout(() => {
                if (!isDropdownHovered) {
                    setIsDropdownHovered(false);
                }
            }, 500); // Increased to 500ms for more time to click
            setDropdownTimeout(timeout);
        };

        const menuItems = [
            { label: 'Home', path: '/' },
            { label: 'Share Food', path: '/share' },
            { label: 'Find Food', path: '/find' },
            { label: 'Trading Hub', path: '/trading' },
            { label: 'Community', path: '/community' },
            { label: 'Impact', path: '/impact' }
        ];

        const handleNavigation = (path) => {
            window.location.href = path;
        };

        const handleLogout = () => {
            localStorage.removeItem('userAuthenticated');
            localStorage.removeItem('currentUser');
            localStorage.removeItem('adminAuthenticated');
            localStorage.removeItem('adminUser');
            window.location.href = '/';
        };

        return (
            <header data-name="header" className="header sticky top-0 z-50 bg-white shadow-sm">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        {/* Mobile menu button */}
                        <div className="flex items-center lg:hidden">
                            <button
                                type="button"
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                                onClick={() => setIsMenuOpen(true)}
                            >
                                <span className="sr-only">Open menu</span>
                                <i className="fas fa-bars text-xl"></i>
                            </button>
                        </div>

                        <div data-name="logo" className="flex items-center">
                            <a href="/" className="flex items-center">
                                <div className="h-10 w-10 bg-green-600 rounded-full flex items-center justify-center text-white">
                                    <i className="fas fa-seedling text-xl"></i>
                                </div>
                                <span className="ml-2 text-xl font-semibold text-gray-900">DoGoods</span>
                            </a>
                        </div>

                        <nav data-name="desktop-nav" className="hidden md:flex space-x-6">
                            {menuItems.map((item, index) => (
                                <a 
                                    key={index}
                                    href={item.path}
                                    className="nav-link hover:text-green-600 transition-colors duration-200"
                                >
                                    {item.label}
                                </a>
                            ))}
                        </nav>

                        <div data-name="user-actions" className="hidden md:flex items-center space-x-4">
                            <button 
                                className="text-gray-400 hover:text-gray-500"
                                onClick={() => handleNavigation('/notifications')}
                            >
                                <i className="fas fa-bell"></i>
                            </button>
                            
                            {isAuthenticated ? (
                                <div 
                                    className="relative group"
                                    onMouseEnter={handleDropdownEnter}
                                    onMouseLeave={handleDropdownLeave}
                                >
                                    <button className="flex items-center max-w-xs bg-white rounded-full focus:outline-none">
                                        <div className="flex items-center">
                                            <Avatar size="sm" src={currentUser?.avatar} />
                                            <span className="ml-2 text-gray-700 text-sm">
                                                {currentUser?.name || 'User'}
                                            </span>
                                            <i className={`fas fa-chevron-down text-xs ml-2 text-gray-400 transform transition-transform ${isDropdownHovered ? 'rotate-180' : ''}`}></i>
                                        </div>
                                    </button>
                                    
                                    {isDropdownHovered && (
                                        <div 
                                            className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100"
                                            role="menu"
                                        >
                                            <div className="py-1">
                                                <a 
                                                    href="/profile" 
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    role="menuitem"
                                                >
                                                    Your Profile
                                                </a>
                                                {currentUser?.role === 'admin' && (
                                                    <a 
                                                        href="/admin" 
                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                        role="menuitem"
                                                    >
                                                        Admin Dashboard
                                                    </a>
                                                )}
                                                <a 
                                                    href="/settings" 
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    role="menuitem"
                                                >
                                                    Settings
                                                </a>
                                            </div>
                                            <div className="py-1">
                                                <button 
                                                    onClick={handleLogout}
                                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    role="menuitem"
                                                >
                                                    Sign Out
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Button
                                    variant="primary"
                                    onClick={() => handleNavigation('/login')}
                                >
                                    <i className="fas fa-user-circle mr-2"></i>
                                    Sign In
                                </Button>
                            )}
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden flex items-center">
                            <button
                                type="button"
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                                onClick={() => setIsMenuOpen(true)}
                            >
                                <span className="sr-only">Open menu</span>
                                <i className="fas fa-bars text-xl"></i>
                            </button>
                        </div>
                    </div>

                    {/* Off-canvas menu */}
                    <div 
                        className={`fixed inset-0 z-50 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}
                    >
                        {/* Overlay */}
                        <div 
                            className="absolute inset-0 bg-black bg-opacity-50"
                            onClick={() => setIsMenuOpen(false)}
                        ></div>
                        
                        {/* Menu content */}
                        <div className="absolute top-0 left-0 bottom-0 w-64 max-w-sm bg-white shadow-xl flex flex-col">
                            <div className="p-4 border-b flex items-center justify-between">
                                <a href="/" className="flex items-center">
                                    <div className="h-8 w-8 bg-green-600 rounded-full flex items-center justify-center text-white">
                                        <i className="fas fa-seedling"></i>
                                    </div>
                                    <span className="ml-2 text-lg font-semibold text-gray-900">DoGoods</span>
                                </a>
                                <button 
                                    onClick={() => setIsMenuOpen(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <i className="fas fa-times"></i>
                                </button>
                            </div>
                            
                            {isAuthenticated && (
                                <div className="p-4 border-b">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                                            {currentUser?.avatar ? (
                                                <img 
                                                    src={currentUser.avatar} 
                                                    alt={currentUser.name} 
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <i className="fas fa-user text-gray-400 flex items-center justify-center w-full h-full"></i>
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-medium">{currentUser?.name || 'User'}</p>
                                            <p className="text-sm text-gray-500">{currentUser?.email}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                            
                            <div className="flex-1 overflow-y-auto p-4">
                                <nav className="space-y-2">
                                    {menuItems.map((item, index) => (
                                        <a
                                            key={index}
                                            href={item.path}
                                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            {item.label}
                                        </a>
                                    ))}
                                </nav>
                                
                                <div className="mt-6 pt-6 border-t">
                                    <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Resources
                                    </h3>
                                    <nav className="mt-2 space-y-2">
                                        <a 
                                            href="/how-it-works" 
                                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            How It Works
                                        </a>
                                        <a 
                                            href="/blog" 
                                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Blog
                                        </a>
                                        <a 
                                            href="/success" 
                                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Success Stories
                                        </a>
                                    </nav>
                                </div>
                                
                                {isAuthenticated && (
                                    <div className="mt-6 pt-6 border-t">
                                        <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                            Account
                                        </h3>
                                        <nav className="mt-2 space-y-2">
                                            <a 
                                                href="/profile" 
                                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                Your Profile
                                            </a>
                                            {currentUser?.role === 'admin' && (
                                                <a 
                                                    href="/admin" 
                                                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                                                    onClick={() => setIsMenuOpen(false)}
                                                >
                                                    Admin Dashboard
                                                </a>
                                            )}
                                            <a 
                                                href="/settings" 
                                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                Settings
                                            </a>
                                            <button 
                                                onClick={handleLogout}
                                                className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                                            >
                                                Sign Out
                                            </button>
                                        </nav>
                                    </div>
                                )}
                            </div>
                            
                            {!isAuthenticated && (
                                <div className="p-4 border-t">
                                    <Button
                                        variant="primary"
                                        fullWidth
                                        onClick={() => {
                                            setIsMenuOpen(false);
                                            handleNavigation('/login');
                                        }}
                                    >
                                        <i className="fas fa-user-circle mr-2"></i>
                                        Sign In
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>
        );
    } catch (error) {
        console.error('Header component error:', error);
        reportError(error);
        return null;
    }
}
