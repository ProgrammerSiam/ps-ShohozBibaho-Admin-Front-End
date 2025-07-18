import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import SidebarDropdown from "./SidebarDropdown";

const SidebarItem = ({ menuItem, setSidebarOpen }) => {
  const [groupOpen, setGroupOpen] = useState(false);
  const pathname = usePathname();

  const handleClick = (e) => {
    if (menuItem.children) {
      e.preventDefault();
      setGroupOpen(!groupOpen);
    } else {
      setSidebarOpen(false);
    }
  };

  const isActive = (menuItem) => {
    if (pathname === menuItem.path) return true;

    if (menuItem.children) {
      return menuItem.children.some((child) => isActive(child));
    }

    return false;
  };

  const isItemActive = isActive(menuItem);

  return (
    <li>
      <Link
        href={menuItem.path}
        onClick={handleClick}
        className={`${isItemActive ? "text-primary bg-pink-50" : "text-gray-700 hover:bg-gray-100"} group relative flex items-center gap-2.5 rounded px-4 py-2 text-sm font-medium transition-all duration-75`}
      >
        {menuItem.icon}
        {menuItem.label}
        {menuItem.children && (
          <svg
            className={`absolute top-1/2 right-4 -translate-y-1/2 fill-current transition-transform duration-200 ${isItemActive ? "text-primary" : "text-gray-700"} ${groupOpen && "rotate-180"}`}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
              fill=""
            />
          </svg>
        )}
      </Link>

      {menuItem.children && (
        <div className={`transform overflow-hidden ${!groupOpen && "hidden"}`}>
          <SidebarDropdown
            menuItems={menuItem.children}
            setSidebarOpen={setSidebarOpen}
          />
        </div>
      )}
    </li>
  );
};

export default SidebarItem;
