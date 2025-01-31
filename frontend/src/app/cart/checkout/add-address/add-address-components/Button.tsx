import React from 'react';

interface ButtonProps {
  text: string;
  type?: 'button' | 'submit' | 'reset'; // Add this line
  disabled?: boolean; // Add this line to handle the `disabled` prop
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ text, type = 'button',
  disabled = false, onClick, variant = 'primary'  }) => {
  const baseStyle = 'px-6 py-2 max-[524px]:px-3 rounded-lg font-medium';
  const variantStyle =
    variant === 'primary'
      ? 'bg-orange-orange500 opacity-[0.8] hover:opacity-[0.9] text-white'
      : 'bg-white text-medium_primary border border-medium_primary hover:bg-medium_primary hover:opacity-[0.9] hover:text-white hover:border-medium_primary font-semibold';

  return (
    <button onClick={onClick} className={`${baseStyle} ${variantStyle}`} type={type} disabled={disabled}>
      {text}
    </button>
  );
};

export default Button;
