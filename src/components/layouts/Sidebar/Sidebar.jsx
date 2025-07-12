import LogoBlack from "@/components/ui/LogoBlack";
import { dashboardMenuConfig } from "@/lib/dashboardMenuConfig";
import React, { useEffect, useRef } from "react";
import SidebarItem from "./SidebarItem";

const Sidebar = ({ trigger, sidebarOpen, setSidebarOpen }) => {
  const sidebar = useRef(null);

  // Close sidebar on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebar.current &&
        !sidebar.current.contains(event.target) &&
        !trigger.current.contains(event.target)
      ) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [trigger, setSidebarOpen]);

  // Close sidebar on 'Esc' key press
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        setSidebarOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscKey);
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [setSidebarOpen]);

  return (
    <aside
      ref={sidebar}
      className={`absolute top-0 left-0 z-50 mt-14 flex h-screen w-[57%] flex-col overflow-y-hidden border-r border-gray-200 bg-white transition-all duration-300 ease-linear sm:w-64 lg:static lg:mt-0 lg:translate-x-0 2xl:w-72 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* SIDEBAR HEADER */}
      <div className="flex justify-center px-4 py-4 lg:px-5 lg:py-5">
        {/* logo */}
        <LogoBlack />
      </div>

      {/* SIDEBAR MENU */}
      <div className="no-scrollbar overflow-y-auto transition-all">
        <nav className="px-4 lg:px-5">
          <ul className="flex flex-col gap-3">
            {dashboardMenuConfig?.map((menuItem, idx) => (
              <SidebarItem
                key={idx}
                menuItem={menuItem}
                setSidebarOpen={setSidebarOpen}
              />
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
