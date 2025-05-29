import React from "react";

const CRMLayout = ({ title, children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-900 via-gray-800 to-black text-white font-sans">
      <header className="p-6 border-b border-gray-700 bg-black bg-opacity-30 backdrop-blur-md">
        <h1 className="text-2xl font-bold tracking-wide">{title}</h1>
      </header>
      <main className="p-6 max-w-7xl mx-auto">{children}</main>
    </div>
  );
};

export default CRMLayout;
