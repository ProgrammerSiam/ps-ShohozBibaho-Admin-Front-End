import React from "react";

const Backdrop = ({ sidebarOpen, setSidebarOpen }) => {
  if (!sidebarOpen) return null;

  return (
    <div
      className="fixed inset-0 z-40 bg-gray-900/50 lg:hidden"
      onClick={() => setSidebarOpen(!sidebarOpen)}
    />
  );
};

export default Backdrop;
