'use client';

import React, { useRef } from 'react';

interface FormFieldProps {
  label: string;
  placeholder?: string;
  type?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  placeholder = '',
  type = 'text',
  value,
  onChange,
  error,
  required = false,
  disabled = false,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleLabelClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="relative mb-6">
      <input
        ref={inputRef}
        type={type}
        placeholder={placeholder || label}
        value={value} // Controlled value
        onChange={onChange} // Controlled onChange
        required={required}
        disabled={disabled}
        className={`peer w-full px-4 pt-5 focus:outline-[0.1rem] focus:border-[0.1rem] pb-2 text-gray-900 placeholder-transparent border rounded-lg focus:outline-none ${
          error ? 'border-red-500' : 'border-gray-thin'
        } ${disabled ? 'bg-gray-200 cursor-not-allowed' : ''}`}
      />
      <label
        onClick={handleLabelClick}
        className="absolute bg-white left-4 cursor-auto text-gray-mediumLight text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-mediumLight peer-focus:top-[-0.6rem] peer-focus:text-sm"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default FormField;
