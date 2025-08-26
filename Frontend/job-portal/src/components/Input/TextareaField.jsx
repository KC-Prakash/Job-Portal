import { AlertCircle, X } from "lucide-react";

const TextareaField = ({
    label,
    id,
    placeholder,
    value,
    onChange,
    error,
    helperText,
    required = false,
    disabled = false,
    rows = 6,
    clearable = false,
    ...props
}) => {
    return (
        <div className="space-y-2 relative"> {/* Make parent relative */}
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>

            <textarea
                id={id}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                rows={rows}
                disabled={disabled}
                className={`w-full px-3 py-2.5 border rounded-lg text-base transition-colors duration-200 resize-y disabled:bg-gray-50 disabled:text-gray-500 ${error ? "border-red-300 focus:border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    } focus:outline-none focus:ring-2 focus:ring-opacity-20`}
                {...props}
            />

            {/* Clear button */}
            {clearable && value && !disabled && (
                <button
                    type="button"
                    onClick={() => onChange({ target: { value: "" } })}
                    className="absolute top-10 right-2 flex items-center justify-center text-gray-400 hover:text-gray-600"
                >
                    <div className="bg-gray-200 hover:bg-gray-300 rounded-full p-1 transition-colors duration-200">
                        <X className="w-4 h-4" />
                    </div>
                </button>
            )}

            {error && (
                <div className="flex items-center space-x-1 text-sm text-red-600 mt-1">
                    <AlertCircle className="w-4 h-4" />
                    <span>{error}</span>
                </div>
            )}

            {helperText && !error && (
                <p className="text-sm text-gray-500 mt-1">{helperText}</p>
            )}
        </div>
    );
};

export default TextareaField;
