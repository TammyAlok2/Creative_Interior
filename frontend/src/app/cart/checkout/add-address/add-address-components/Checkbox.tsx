import React from 'react';

interface CheckboxProps {
  checked: boolean; // Specify that `checked` is a boolean
  onCheckedChange: (checked: boolean) => void; // Function to handle changes with a boolean parameter
  // label: string; // Label text for the checkbox
  disabled?: boolean; // Optional disabled prop
}

const Checkbox: React.FC<CheckboxProps> = ({ label }: any) => {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
      />
      <label className="ml-2 text-gray-700">{label}</label>
    </div>
  );
};

export default Checkbox;
