import { Button } from "@/components/ui/button";
import LogoBlack from "@/components/ui/LogoBlack";
import Link from "next/link";
import React from "react";

const notFoundPage = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="mb-6 lg:mb-8">
        <LogoBlack />
      </div>
      <div className="mx-auto max-w-80 rounded-lg border border-gray-200 p-8 text-center shadow-lg lg:max-w-md lg:p-10 xl:p-14">
        <h1 className="mb-4 text-2xl font-bold md:text-3xl lg:mb-6 lg:text-4xl">
          Page Not Found
        </h1>
        <p className="mb-6 md:text-lg lg:mb-8">
          Oops! The page you are looking for does not exist.
        </p>
        <Button asChild size="lg">
          <Link href="/">Go back to the Dashboard</Link>
        </Button>
      </div>
    </div>
  );
};

export default notFoundPage;
