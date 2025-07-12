import React from "react";
import ViewManageUsers from "./_components/ViewManageUsers";

export const metadata = {
  title: "Users Management | Shohoz Bibaho - Admin Dashboard",
  description:
    "Find your perfect life partner with Shohoz Bibaho. A trusted and easy-to-use matrimony platform.",
};

const UsersPage = () => {
  return (
    <div>
      <ViewManageUsers />
    </div>
  );
};

export default UsersPage;
