"use client";

import Header from "@/components/layouts/Header/Header";
import Backdrop from "@/components/layouts/Sidebar/Backdrop";
import Sidebar from "@/components/layouts/Sidebar/Sidebar";
import { useRef, useState } from "react";

export default function DefaultLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const trigger = useRef(null);

  return (
    <div className="flex min-h-screen overflow-hidden bg-gray-50">
      {/* Dashboard Sidebar */}
      <Sidebar
        trigger={trigger}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Dashboard Backdrop */}
      <Backdrop sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content Area */}
      <div className="relative flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
        {/* Dashboard Header */}
        <Header
          trigger={trigger}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Main Dashboard Content */}
        <div className="mx-auto w-full max-w-(--breakpoint-2xl) p-4 md:p-6 2xl:p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
