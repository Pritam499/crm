import React from 'react';
import Sidebar from "./Sidebar.jsx";
import Header from "./Header.jsx";

export default function Layout({ children }) {
  return (
    <div className="flex h-screen bg-bg">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
