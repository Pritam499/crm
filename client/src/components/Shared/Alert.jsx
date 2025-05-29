import React from "react";
import PropTypes from "prop-types";
import { FiAlertCircle, FiCheckCircle, FiInfo } from "react-icons/fi";
import { MdError } from "react-icons/md";

const variantStyles = {
  info: {
    icon: <FiInfo className="text-blue-400" size={20} />,
    bg: "bg-blue-100/10 border-blue-300/30 text-blue-100",
  },
  success: {
    icon: <FiCheckCircle className="text-green-400" size={20} />,
    bg: "bg-green-100/10 border-green-300/30 text-green-100",
  },
  warning: {
    icon: <FiAlertCircle className="text-yellow-300" size={20} />,
    bg: "bg-yellow-100/10 border-yellow-300/30 text-yellow-100",
  },
  error: {
    icon: <MdError className="text-red-400" size={22} />,
    bg: "bg-red-100/10 border-red-300/30 text-red-100",
  },
};

export default function Alert({ children, variant = "info", className = "" }) {
  const { icon, bg } = variantStyles[variant] || variantStyles.info;

  return (
    <div
      className={`flex items-start gap-3 p-4 rounded-lg border ${bg} ${className}`}
    >
      <div className="mt-0.5">{icon}</div>
      <div className="flex-1 text-sm leading-relaxed">{children}</div>
    </div>
  );
}

Alert.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["info", "success", "warning", "error"]),
  className: PropTypes.string,
};
