import React from 'react';

interface FormSectionProps {
  children: React.ReactNode;
}

const FormSection: React.FC<FormSectionProps> = ({ children }) => {
  return (
    <div className="mb-6">
      {/* <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2> */}
      {children}
    </div>
  );
};

export default FormSection;
