import React from "react";
import ViewPages from "./_components/ViewPages";

export const metadata = {
  title: "Page Management | Shohoz Bibaho - Admin Dashboard",
  description:
    "Find your perfect life partner with Shohoz Bibaho. A trusted and easy-to-use matrimony platform.",
};

const DynamicPages = () => {
  return (
    <div>
      <ViewPages />
    </div>
  );
};

export default DynamicPages;
