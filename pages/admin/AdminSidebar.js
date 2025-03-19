function AdminSidebar({ active, onNavigate }) {
    try {
        const menuItems = [
            { id: 'dashboard', label: 'Dashboard', icon: 'fa-tachometer-alt', path: '/admin' },
            { id: 'users', label: 'User Management', icon: 'fa-users', path: '/admin/users' },
            { id: 'content', label: 'Content Moderation', icon: 'fa-shield-alt', path: '/admin/content' },
            { id: 'distribution', label: 'Food Distribution', icon: 'fa-box-open', path: '/admin/distribution' },
            { id: 'reports', label: 'Reports & Analytics', icon: 'fa-chart-bar', path: '/admin/reports' },
            { id: 'settings', label: 'Settings', icon: 'fa-cog', path: '/admin/settings' }
        ];

        return (
            <div data-name="admin-sidebar" className="h-full flex flex-col">
                {/* Logo */}
                <div className="p-4 border-b border-gray-700">
                    <button 
                        onClick={() => onNavigate('/admin')}
                        className="flex items-center space-x-2 text-white"
                    >
                        <div className="h-8 w-8 bg-green-600 rounded-full flex items-center justify-center">
                            <i className="fas fa-seedling"></i>
                        </div>
                        <span className="text-lg font-semibold">DoGoods Admin</span>
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-2 py-4 space-y-1">
                    {menuItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => onNavigate(item.path)}
                            className={`
                                w-full flex items-center px-4 py-2 text-sm font-medium rounded-md
                                transition-colors duration-150 ease-in-out
                                ${active === item.id 
                                    ? 'bg-gray-900 text-white' 
                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'}
                            `}
                        >
                            <i className={`fas ${item.icon} w-6`}></i>
                            <span className="ml-3">{item.label}</span>
                        </button>
                    ))}
                </nav>

                {/* Footer */}
                <div className="p-4 border-t border-gray-700">
                    <button 
                        onClick={() => onNavigate('/')}
                        className="flex items-center px-2 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white w-full"
                    >
                        <i className="fas fa-arrow-left w-6"></i>
                        <span className="ml-3">Back to Site</span>
                    </button>
                </div>
            </div>
        );
    } catch (error) {
        console.error('AdminSidebar error:', error);
        reportError(error);
        return null;
    }
}
