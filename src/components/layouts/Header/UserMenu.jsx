import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AUTH_TOKEN_KEY } from "@/lib/constant";
import { resetAuth } from "@/redux/features/auth/authSlice";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { BsBoxArrowRight, BsGear } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

const UserMenu = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { user } = useSelector((state) => state.auth);

  // Logout Action
  const handleLogout = () => {
    Cookies.remove(AUTH_TOKEN_KEY);
    dispatch(resetAuth());
    router.push("/login");
  };

  return (
    <DropdownMenu className="border-0 border-none focus:border-0 focus:border-none">
      <DropdownMenuTrigger className="group inline-flex cursor-pointer items-center justify-center border-0 border-none focus:border-0 focus:border-none">
        <FaUserCircle className="text-secondary text-2xl" />
        <div className="ml-2.5 flex items-center truncate text-gray-700">
          <span className="truncate text-sm font-medium">
            {user?.data?.fullName?.split(" ")[0]}
          </span>
          <svg
            className="ml-0.5 fill-current"
            width="16"
            height="16"
            viewBox="0 0 16 16"
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
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-4 mr-4 border-gray-200 text-gray-700 shadow-none md:mr-6 2xl:mr-8">
        <DropdownMenuLabel className="flex flex-col text-sm font-medium">
          <span>{user?.data?.fullName}</span>
          <span className="text-xs font-normal">{user?.data?.email}</span>
        </DropdownMenuLabel>
        <Link href="/settings/profile">
          <DropdownMenuItem className="cursor-pointer">
            <BsGear className="text-xl" /> Account Settings
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
          <BsBoxArrowRight className="text-lg" /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
