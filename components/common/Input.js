function Input({
    type = 'text',
    label,
    value,
    onChange,
    placeholder,
    error,
    helperText,
    required = false,
    disabled = false,
    icon = null,
    className = '',
    options = [],
    min,
    max,
    accept,
    rows = 4
}) {
    try {
        const inputId = React.useId();

        const baseInputStyles = `
            w-full px-4 py-2 rounded-lg border
            focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
            disabled:bg-gray-100 disabled:cursor-not-allowed
            transition-colors duration-200
        `;

        const inputStyles = `
            ${baseInputStyles}
            ${error ? 'border-red-500' : 'border-gray-300'}
            ${icon ? 'pl-10' : ''}
            ${className}
        `;

        const renderInput = () => {
            switch (type) {
                case 'textarea':
                    return (
                        <textarea
                            id={inputId}
                            value={value}
                            onChange={onChange}
                            placeholder={placeholder}
                            disabled={disabled}
                            required={required}
                            className={inputStyles}
                            rows={rows}
                        />
                    );
                case 'select':
                    return (
                        <select
                            id={inputId}
                            value={value}
                            onChange={onChange}
                            disabled={disabled}
                            required={required}
                            className={inputStyles}
                        >
                            {options.map((option, index) => (
                                <option key={index} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    );
                case 'file':
                    return (
                        <input
                            id={inputId}
                            type={type}
                            onChange={onChange}
                            disabled={disabled}
                            required={required}
                            accept={accept}
                            className={`${inputStyles} file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100`}
                        />
                    );
                default:
                    return (
                        <input
                            id={inputId}
                            type={type}
                            value={value}
                            onChange={onChange}
                            placeholder={placeholder}
                            disabled={disabled}
                            required={required}
                            min={min}
                            max={max}
                            className={inputStyles}
                        />
                    );
            }
        };

        return (
            <div data-name="input-wrapper" className="w-full">
                {label && (
                    <label
                        htmlFor={inputId}
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        {label}
                        {required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                )}

                <div className="relative">
                    {icon && (
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                            {icon}
                        </div>
                    )}

                    {renderInput()}
                </div>

                {(error || helperText) && (
                    <p className={`mt-1 text-sm ${error ? 'text-red-500' : 'text-gray-500'}`}>
                        {error || helperText}
                    </p>
                )}
            </div>
        );
    } catch (error) {
        console.error('Input component error:', error);
        reportError(error);
        return null;
    }
}
