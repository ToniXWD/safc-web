'use client';
import { useState, useRef, useEffect } from 'react';

interface ComboboxFieldProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: string[];
    placeholder: string;
    disabled?: boolean;
}

export function ComboboxField({
    label,
    value,
    onChange,
    options,
    placeholder,
    disabled = false
}: ComboboxFieldProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState(value);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // 过滤选项
    const filteredOptions = options.filter(option =>
        option.toLowerCase().includes(inputValue.toLowerCase())
    );

    // 点击外部关闭下拉框
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // 同步外部值
    useEffect(() => {
        setInputValue(value);
    }, [value]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setInputValue(newValue);
        setIsOpen(true);
        onChange(newValue);
    };

    const handleOptionClick = (option: string) => {
        onChange(option);
        setInputValue(option);
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={wrapperRef}>
            <label className="block text-sm font-medium text-gray-300 mb-1">
                {label}
            </label>
            <div className="relative">
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onFocus={() => !disabled && setIsOpen(true)}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={`w-full bg-gray-700 text-white rounded-md py-2 pl-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                />
                <button
                    type="button"
                    onClick={() => !disabled && setIsOpen(!isOpen)}
                    className={`absolute inset-y-0 right-0 flex items-center px-2 
            ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                    {/* 简单的箭头图标 */}
                    <svg
                        className={`w-5 h-5 text-gray-400 transform transition-transform
              ${isOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </button>
            </div>

            {/* 下拉选项 */}
            {isOpen && !disabled && (
                <div className="absolute z-10 mt-1 w-full bg-gray-700 rounded-md shadow-lg max-h-60 overflow-auto">
                    {filteredOptions.map((option) => (
                        <div
                            key={option}
                            onClick={() => handleOptionClick(option)}
                            className="px-4 py-2 cursor-pointer hover:bg-blue-600 text-gray-300 hover:text-white"
                        >
                            {option}
                        </div>
                    ))}
                    {inputValue && !filteredOptions.includes(inputValue) && (
                        <div
                            onClick={() => handleOptionClick(inputValue)}
                            className="px-4 py-2 cursor-pointer hover:bg-blue-600 text-blue-400 hover:text-white"
                        >
                            创建: {inputValue}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}