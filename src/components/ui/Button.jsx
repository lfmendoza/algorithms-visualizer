import React from "react";

const Button = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
}) => {
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary:
      "bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white",
    danger: "bg-red-600 hover:bg-red-700 text-white",
    success: "bg-green-600 hover:bg-green-700 text-white",
  };

  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${variants[variant]} ${sizes[size]} 
        rounded-lg font-medium transition-colors duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;
