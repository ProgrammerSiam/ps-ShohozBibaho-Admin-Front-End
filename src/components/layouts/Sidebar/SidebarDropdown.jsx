import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SidebarDropdown = ({ menuItems, setSidebarOpen }) => {
  const pathname = usePathname();

  return (
    <ul className="mt-4 mb-1 flex flex-col gap-2.5 pl-7">
      {menuItems?.map((item, index) => (
        <li key={index}>
          <Link
            href={item.path}
            onClick={() => setSidebarOpen(false)}
            className={`group relative flex items-center gap-2.5 rounded px-4 text-sm font-medium duration-300 ease-in-out ${
              pathname === item.path
                ? "text-primary"
                : "hover:text-primary text-gray-700"
            }`}
          >
            {item.icon}
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SidebarDropdown;
