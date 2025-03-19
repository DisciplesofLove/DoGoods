function Button({ 
    children, 
    variant = 'primary', 
    size = 'md', 
    disabled = false, 
    fullWidth = false,
    icon = null,
    onClick,
    type = 'button',
    className = ''
}) {
    try {
        const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-200';
        
        const variants = {
            primary: 'bg-green-600 text-white hover:bg-green-700 disabled:bg-green-300',
            secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:bg-gray-100',
            outline: 'border-2 border-green-600 text-green-600 hover:bg-green-50 disabled:border-green-300',
            danger: 'bg-red-600 text-white hover:bg-red-700 disabled:bg-red-300'
        };

        const sizes = {
            sm: 'px-3 py-1.5 text-sm',
            md: 'px-4 py-2 text-base',
            lg: 'px-6 py-3 text-lg'
        };

        const classes = `
            ${baseStyles}
            ${variants[variant]}
            ${sizes[size]}
            ${fullWidth ? 'w-full' : ''}
            ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
            ${className}
        `;

        return (
            <button
                data-name="button"
                type={type}
                className={classes}
                disabled={disabled}
                onClick={onClick}
            >
                {icon && <span className="mr-2">{icon}</span>}
                {children}
            </button>
        );
    } catch (error) {
        console.error('Button component error:', error);
        reportError(error);
        return null;
    }
}
