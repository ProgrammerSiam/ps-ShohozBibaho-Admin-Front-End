import React from "react";

export const metadata = {
  title: "Dashboard | Shohoz Bibaho - Admin Dashboard",
  description:
    "Find your perfect life partner with Shohoz Bibaho. A trusted and easy-to-use matrimony platform.",
};

const DashboardHomePage = () => {
  return (
    <div className="flex min-h-[calc(100vh-150px)] items-center justify-center bg-gray-50">
      <div className="w-fit rounded-lg border border-gray-200 bg-white p-6 text-center shadow-lg md:p-8">
        <h1 className="mb-2 text-2xl font-bold md:text-3xl">
          Welcome to ShohozBibaho Admin Dashboard
        </h1>
        <p className="mx-auto text-gray-800 md:w-3/4">
          Manage user biodata, biodata approvals, and match-making activities
          all in one place.
        </p>
      </div>
    </div>
  );
};

export default DashboardHomePage;
