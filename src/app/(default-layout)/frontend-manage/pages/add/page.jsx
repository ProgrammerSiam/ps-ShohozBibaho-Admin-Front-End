import React from "react";
import PageCreateForm from "../_components/PageCreateForm";

export const metadata = {
  title: "Create Page | NonAcademy",
  description: "A online learning platform",
};

const DynamicPagesCreate = () => {
  return (
    <div>
      <div className="rounded bg-white p-5">
        <h2 className="mb-4 text-center text-xl font-medium md:mb-7 md:text-2xl md:font-bold md:tracking-wide">
          Create Dynamic Page
        </h2>
        <PageCreateForm />
      </div>
    </div>
  );
};

export default DynamicPagesCreate;
