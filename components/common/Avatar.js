function Avatar({
    src,
    alt,
    size = 'md',
    status,
    className = ''
}) {
    try {
        const sizes = {
            xs: 'w-6 h-6',
            sm: 'w-8 h-8',
            md: 'w-10 h-10',
            lg: 'w-12 h-12',
            xl: 'w-16 h-16'
        };

        const statusColors = {
            online: 'bg-green-500',
            offline: 'bg-gray-500',
            busy: 'bg-red-500',
            away: 'bg-yellow-500'
        };

        return (
            <div data-name="avatar" className="relative inline-block">
                <img
                    src={src || 'https://via.placeholder.com/150'}
                    alt={alt || 'User avatar'}
                    className={`
                        rounded-full object-cover
                        ${sizes[size]}
                        ${className}
                    `}
                />
                
                {status && (
                    <span
                        className={`
                            absolute bottom-0 right-0
                            w-3 h-3 rounded-full
                            border-2 border-white
                            ${statusColors[status]}
                        `}
                    />
                )}
            </div>
        );
    } catch (error) {
        console.error('Avatar component error:', error);
        reportError(error);
        return null;
    }
}
