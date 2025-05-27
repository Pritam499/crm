import React from "react";

const Button = ({
  children,
  type = "button",
  onClick,
  disabled = false,
  className = "",
  ...props
}) => {
  const baseClasses =
    "px-4 py-2 rounded bg-blue-600 text-white font-medium hover:bg-blue-700 transition duration-200";

  const finalClass = `${baseClasses} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={finalClass}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
