// src/components/Shared/Loader.jsx
import React from "react";
export default function Loader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
    </div>
  );
}
