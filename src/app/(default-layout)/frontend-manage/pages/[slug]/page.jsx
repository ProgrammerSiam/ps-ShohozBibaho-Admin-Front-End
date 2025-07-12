import React from "react";
import PageEditForm from "../_components/PageEditForm";

export const metadata = {
  title: "Edit Page | NonAcademy",
  description: "A online learning platform",
};

const DynamicPagesEdit = ({ params }) => {
  return (
    <div>
      <div className="rounded bg-white p-5">
        <h2 className="mb-4 text-center text-xl font-medium md:mb-7 md:text-2xl md:font-bold md:tracking-wide">
          Edit Dynamic Page
        </h2>
        <PageEditForm slug={params?.slug} />
      </div>
    </div>
  );
};

export default DynamicPagesEdit;
