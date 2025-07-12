"use client";

import { Button } from "@/components/ui/button";
import LogoBlack from "@/components/ui/LogoBlack";
import React, { useEffect } from "react";

const ErrorPage = ({ error, reset }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="mb-6 lg:mb-8">
        <LogoBlack />
      </div>
      <div className="mx-auto max-w-lg rounded-lg border border-gray-200 p-8 text-center shadow-2xl lg:p-10 xl:p-14">
        <h1 className="text-destructive mb-4 text-xl font-extrabold md:text-3xl lg:mb-6">
          Something Went Wrong!
        </h1>
        <p className="mb-6 text-sm lg:mb-8">
          We&apos;re sorry, but the page you&apos;re looking for can&apos;t be
          found or an unexpected error has occurred.
        </p>
        <Button onClick={() => reset()} size="lg">
          Try Again
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;
