function Footer() {
    try {
        const mainLinks = [
            { label: 'How It Works', path: '/how-it-works' },
            { label: 'Share Food', path: '/share' },
            { label: 'Find Food', path: '/find' },
            { label: 'Trading Hub', path: '/trading' }
        ];

        const communityLinks = [
            { label: 'Blog', path: '/blog' },
            { label: 'Success Stories', path: '/success' },
            { label: 'Impact Reports', path: '/impact' },
            { label: 'Community Hub', path: '/community' }
        ];

        const legalLinks = [
            { label: 'Terms of Service', path: '/terms' },
            { label: 'Privacy Policy', path: '/privacy' },
            { label: 'Cookie Policy', path: '/cookies' }
        ];

        const socialLinks = [
            { label: 'Facebook', icon: 'facebook-f', url: 'https://facebook.com/dogoods' },
            { label: 'Twitter', icon: 'twitter', url: 'https://twitter.com/dogoods' },
            { label: 'Instagram', icon: 'instagram', url: 'https://instagram.com/dogoods' },
            { label: 'LinkedIn', icon: 'linkedin-in', url: 'https://linkedin.com/company/dogoods' }
        ];

        return (
            <footer data-name="footer" className="bg-gray-900 text-white">
                <div className="container mx-auto px-4 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div data-name="footer-about">
                            <a href="/" className="flex items-center mb-4">
                                <div className="h-10 w-10 bg-green-600 rounded-full flex items-center justify-center text-white">
                                    <i className="fas fa-seedling text-xl"></i>
                                </div>
                                <span className="ml-2 text-xl font-semibold">DoGoods</span>
                            </a>
                            <p className="text-gray-400">
                                Reducing food waste and fighting hunger through community-driven food sharing and trading.
                            </p>
                        </div>

                        <div data-name="footer-links">
                            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                            <ul className="space-y-2">
                                {mainLinks.map((link, index) => (
                                    <li key={index}>
                                        <a 
                                            href={link.path}
                                            className="text-gray-400 hover:text-white transition-colors duration-200"
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div data-name="footer-community">
                            <h3 className="text-lg font-semibold mb-4">Community</h3>
                            <ul className="space-y-2">
                                {communityLinks.map((link, index) => (
                                    <li key={index}>
                                        <a 
                                            href={link.path}
                                            className="text-gray-400 hover:text-white transition-colors duration-200"
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div data-name="footer-contact">
                            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
                            <div className="flex space-x-4 mb-4">
                                {socialLinks.map((social, index) => (
                                    <a 
                                        key={index}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-400 hover:text-white transition-colors duration-200"
                                        aria-label={social.label}
                                    >
                                        <i className={`fab fa-${social.icon}`}></i>
                                    </a>
                                ))}
                            </div>
                            <a 
                                href="mailto:contact@dogoods.com"
                                className="text-gray-400 hover:text-white transition-colors duration-200"
                            >
                                <i className="fas fa-envelope mr-2"></i>
                                contact@dogoods.com
                            </a>
                        </div>
                    </div>

                    <div data-name="footer-bottom" className="border-t border-gray-800 mt-8 pt-8">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <p className="text-gray-400">
                                &copy; {new Date().getFullYear()} DoGoods. All rights reserved.
                            </p>
                            <ul className="flex space-x-6 mt-4 md:mt-0">
                                {legalLinks.map((link, index) => (
                                    <li key={index}>
                                        <a 
                                            href={link.path}
                                            className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        );
    } catch (error) {
        console.error('Footer component error:', error);
        reportError(error);
        return null;
    }
}
