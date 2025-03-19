function App() {
    try {
        const path = window.location.pathname;
        const isUserAuthenticated = localStorage.getItem('userAuthenticated') === 'true';
        const isAdminAuthenticated = localStorage.getItem('adminAuthenticated') === 'true';
        
        // Public routes that don't require authentication
        const publicRoutes = ['/', '/login', '/signup', '/how-it-works', '/blog', '/success', '/impact', '/find', '/terms', '/privacy', '/cookies'];
        
        // Admin-only routes
        const adminRoutes = ['/admin', '/admin/users', '/admin/content', '/admin/distribution', '/admin/reports', '/admin/settings', '/admin/profile'];
        
        // Protected routes that require user authentication
        const protectedRoutes = ['/profile', '/share', '/trading', '/community', '/settings', '/notifications', '/dashboard', '/listings'];

        // Check if current path requires admin access
        const isAdminRoute = path.startsWith('/admin');
        
        // Check if current path is a protected route
        const isProtectedRoute = protectedRoutes.includes(path);
        
        // Handle authentication redirects
        if (isAdminRoute && !isAdminAuthenticated && path !== '/admin/login') {
            window.location.replace('/admin/login');
            return null;
        }

        if (isProtectedRoute && !isUserAuthenticated) {
            window.location.replace('/login');
            return null;
        }

        // Redirect authenticated users away from login/signup
        if ((path === '/login' || path === '/signup') && (isUserAuthenticated || isAdminAuthenticated)) {
            window.location.replace(isAdminAuthenticated ? '/admin' : '/profile');
            return null;
        }

        const renderPage = () => {
            // Admin routes
            if (path.startsWith('/admin')) {
                // Special case for admin login
                if (path === '/admin/login') {
                    return <AdminLogin />;
                }

                // Admin authenticated routes
                switch (path) {
                    case '/admin':
                        return <AdminDashboard />;
                    case '/admin/users':
                        return <UserManagement />;
                    case '/admin/content':
                        return <ContentModeration />;
                    case '/admin/distribution':
                        return <FoodDistributionManagement />;
                    case '/admin/reports':
                        return <AdminReports />;
                    case '/admin/settings':
                        return <AdminSettings />;
                    case '/admin/profile':
                        return <AdminProfile />;
                    default:
                        if (path.match(/\/admin\/distribution\/\d+\/attendees/)) {
                            return <DistributionAttendees />;
                        }
                        if (path.match(/\/admin\/users\/\d+/)) {
                            return <UserDetails />;
                        }
                        return (
                            <AdminLayout active="dashboard">
                                <div className="text-center py-16">
                                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Admin Page Not Found</h1>
                                    <p className="text-gray-600 mb-8">The page you're looking for doesn't exist.</p>
                                    <Button
                                        variant="primary"
                                        onClick={() => window.location.href = '/admin'}
                                    >
                                        Go to Dashboard
                                    </Button>
                                </div>
                            </AdminLayout>
                        );
                }
            }

            // Regular routes with MainLayout
            let content;
            switch (path) {
                // Public pages
                case '/':
                    content = <HomePage />;
                    break;
                case '/find':
                    content = <FindFoodPage />;
                    break;
                case '/blog':
                    content = <Blog />;
                    break;
                case '/success':
                    content = <Success />;
                    break;
                case '/impact':
                    content = <Impact />;
                    break;
                case '/how-it-works':
                    content = <HowItWorks />;
                    break;
                case '/terms':
                    content = <TermsOfService />;
                    break;
                case '/privacy':
                    content = <PrivacyPolicy />;
                    break;
                case '/cookies':
                    content = <CookiesPolicy />;
                    break;

                // Auth pages (without MainLayout)
                case '/login':
                    return <LoginPage />;
                case '/signup':
                    return <SignupPage />;
                case '/forgot-password':
                    return <ForgotPassword />;

                // Protected pages
                case '/profile':
                    content = <ProfilePage />;
                    break;
                case '/dashboard':
                    content = <UserDashboard />;
                    break;
                case '/share':
                    content = <ShareFoodPage />;
                    break;
                case '/trading':
                    content = <TradingHubPage />;
                    break;
                case '/community':
                    content = <CommunityPage />;
                    break;
                case '/settings':
                    content = <UserSettings />;
                    break;
                case '/notifications':
                    content = <Notifications />;
                    break;
                case '/listings':
                    content = <UserListings />;
                    break;

                default:
                    // Check if path matches a food category
                    const categoryMatch = path.match(/^\/find\/category\/([a-zA-Z-]+)$/);
                    if (categoryMatch) {
                        content = <FindFoodPage initialCategory={categoryMatch[1]} />;
                        break;
                    }
                    
                    // Check if path matches a food item detail
                    const foodItemMatch = path.match(/^\/food\/(\d+)$/);
                    if (foodItemMatch) {
                        content = <FoodItemDetail foodId={foodItemMatch[1]} />;
                        break;
                    }
                    
                    // 404 Page
                    content = (
                        <div className="text-center py-16">
                            <h1 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
                            <p className="text-gray-600 mb-8">The page you're looking for doesn't exist.</p>
                            <Button
                                variant="primary"
                                onClick={() => window.location.href = '/'}
                            >
                                Go Home
                            </Button>
                        </div>
                    );
                    break;
            }
            
            // Wrap non-auth pages in MainLayout
            return <MainLayout>{content}</MainLayout>;
        };

        return (
            <React.Fragment>
                {renderPage()}
            </React.Fragment>
        );
    } catch (error) {
        console.error('App component error:', error);
        reportError(error);
        return null;
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
