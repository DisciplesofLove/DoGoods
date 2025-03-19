function Card({
    children,
    title,
    subtitle,
    image,
    footer,
    className = '',
    onClick,
    hoverable = false
}) {
    try {
        const cardStyles = `
            bg-white rounded-lg shadow-sm overflow-hidden
            ${hoverable ? 'transition-transform duration-200 hover:-translate-y-1 hover:shadow-md' : ''}
            ${onClick ? 'cursor-pointer' : ''}
            ${className}
        `;

        return (
            <div
                data-name="card"
                className={cardStyles}
                onClick={onClick}
            >
                {image && (
                    <div data-name="card-image" className="relative h-48">
                        <img
                            src={image}
                            alt={title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}

                <div data-name="card-content" className="p-4">
                    {title && (
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {title}
                        </h3>
                    )}

                    {subtitle && (
                        <p className="text-sm text-gray-500 mb-4">
                            {subtitle}
                        </p>
                    )}

                    {children}
                </div>

                {footer && (
                    <div data-name="card-footer" className="px-4 py-3 bg-gray-50 border-t">
                        {footer}
                    </div>
                )}
            </div>
        );
    } catch (error) {
        console.error('Card component error:', error);
        reportError(error);
        return null;
    }
}
