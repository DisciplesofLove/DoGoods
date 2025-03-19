function AdminLayout({ children, active }) {
    try {
        const [isMobileSidebarOpen, setIsMobileSidebarOpen] = React.useState(false);
        const [isUserDropdownOpen, setIsUserDropdownOpen] = React.useState(false);
        const [adminUser, setAdminUser] = React.useState(null);
        const dropdownRef = React.useRef(null);
        const [dropdownTimeout, setDropdownTimeout] = React.useState(null);

        React.useEffect(() => {
            // Check if user is authenticated and has admin permissions
            const isAuthenticated = localStorage.getItem('adminAuthenticated') === 'true';
            if (!isAuthenticated) {
                window.location.replace('/admin/login');
                return;
            }
            
            // Get admin user data
            const userData = localStorage.getItem('adminUser');
            if (userData) {
                const user = JSON.parse(userData);
                if (!can.manageUsers(user.role)) {
                    window.location.replace('/');
                    return;
                }
                setAdminUser(user);
            }

            // Add click outside listener for dropdown
            const handleClickOutside = (event) => {
                if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                    handleDropdownClose();
                }
            };

            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
                if (dropdownTimeout) {
                    clearTimeout(dropdownTimeout);
                }
            };
        }, []);

        const handleDropdownOpen = () => {
            if (dropdownTimeout) {
                clearTimeout(dropdownTimeout);
            }
            setIsUserDropdownOpen(true);
        };

        const handleDropdownClose = () => {
            const timeout = setTimeout(() => {
                setIsUserDropdownOpen(false);
            }, 300); // Increased delay to 300ms
            setDropdownTimeout(timeout);
        };

        const handleNavigation = (path) => {
            // Close mobile sidebar if open
            setIsMobileSidebarOpen(false);
            // Close user dropdown if open
            setIsUserDropdownOpen(false);
            // Navigate to path
            window.location.href = path;
        };
        
        const handleLogout = () => {
            localStorage.removeItem('adminAuthenticated');
            localStorage.removeItem('adminUser');
            window.location.replace('/admin/login');
        };

        return (
            <div data-name="admin-layout" className="min-h-screen bg-gray-100">
                {/* Mobile sidebar backdrop */}
                {isMobileSidebarOpen && (
                    <div 
                        className="fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity lg:hidden"
                        onClick={() => setIsMobileSidebarOpen(false)}
                    ></div>
                )}

                {/* Mobile sidebar */}
                <div 
                    className={`fixed inset-y-0 left-0 z-30 w-64 bg-gray-800 overflow-y-auto transition-transform transform lg:hidden ${
                        isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
                >
                    <AdminSidebar active={active} onNavigate={handleNavigation} />
                </div>

                {/* Desktop sidebar */}
                <div className="hidden lg:block fixed inset-y-0 left-0 w-64 bg-gray-800">
                    <AdminSidebar active={active} onNavigate={handleNavigation} />
                </div>

                {/* Main content */}
                <div className="lg:pl-64 flex flex-col min-h-screen">
                    {/* Top navigation */}
                    <header className="sticky top-0 z-10 bg-white shadow-sm">
                        <div className="px-4 sm:px-6 lg:px-8">
                            <div className="flex justify-between h-16">
                                {/* Mobile menu button */}
                                <div className="flex items-center lg:hidden">
                                    <button
                                        type="button"
                                        className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                                        onClick={() => setIsMobileSidebarOpen(true)}
                                    >
                                        <span className="sr-only">Open menu</span>
                                        <i className="fas fa-bars text-xl"></i>
                                    </button>
                                </div>

                                {/* Desktop nav items */}
                                <div className="hidden lg:flex lg:items-center">
                                    <span className="text-gray-900 font-medium">
                                        {active.charAt(0).toUpperCase() + active.slice(1)}
                                    </span>
                                </div>

                                {/* User dropdown */}
                                <div className="flex items-center">
                                    {/* Notifications */}
                                    <button className="p-2 text-gray-400 hover:text-gray-500">
                                        <i className="fas fa-bell"></i>
                                    </button>

                                    {/* User menu */}
                                    <div 
                                        className="ml-3 relative" 
                                        ref={dropdownRef}
                                        onMouseEnter={handleDropdownOpen}
                                        onMouseLeave={handleDropdownClose}
                                    >
                                        <div>
                                            <button
                                                className="flex items-center max-w-xs bg-white rounded-full focus:outline-none"
                                                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                                            >
                                                <span className="sr-only">Open user menu</span>
                                                <div className="flex items-center">
                                                    <Avatar size="sm" src={adminUser?.avatar} />
                                                    <span className="ml-2 text-gray-700 text-sm">
                                                        {adminUser?.name || 'Admin User'}
                                                    </span>
                                                    <i className={`fas fa-chevron-down text-xs ml-2 text-gray-400 transform transition-transform ${isUserDropdownOpen ? 'rotate-180' : ''}`}></i>
                                                </div>
                                            </button>
                                        </div>

                                        {/* Dropdown menu */}
                                        {isUserDropdownOpen && (
                                            <div 
                                                className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100"
                                                role="menu"
                                            >
                                                <div className="py-1">
                                                    <button
                                                        onClick={() => handleNavigation('/admin/profile')}
                                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                        role="menuitem"
                                                    >
                                                        <i className="fas fa-user mr-2"></i>
                                                        Your Profile
                                                    </button>
                                                    <button
                                                        onClick={() => handleNavigation('/admin/settings')}
                                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                        role="menuitem"
                                                    >
                                                        <i className="fas fa-cog mr-2"></i>
                                                        Settings
                                                    </button>
                                                </div>
                                                <div className="py-1">
                                                    <button
                                                        onClick={() => handleNavigation('/')}
                                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                        role="menuitem"
                                                    >
                                                        <i className="fas fa-home mr-2"></i>
                                                        View Site
                                                    </button>
                                                </div>
                                                <div className="py-1">
                                                    <button
                                                        onClick={handleLogout}
                                                        className="w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                                                        role="menuitem"
                                                    >
                                                        <i className="fas fa-sign-out-alt mr-2"></i>
                                                        Sign out
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Page content */}
                    <main className="flex-1 p-4">
                        {children}
                    </main>
                </div>
            </div>
        );
    } catch (error) {
        console.error('AdminLayout error:', error);
        reportError(error);
        return null;
    }
}
