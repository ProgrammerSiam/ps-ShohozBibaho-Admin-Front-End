import GridShape from "@/components/ui/GridShape";
import LogoWhite from "@/components/ui/LogoWhite";
import React from "react";

export default function FullWidthPageLayout({ children }) {
  return (
    <div className="bg-white p-6 sm:p-0">
      <div className="relative flex h-screen w-full flex-col justify-center sm:p-0 lg:flex-row">
        {children}

        <div className="hidden h-full w-full items-center bg-[#18181B] lg:grid lg:w-1/2">
          <div className="relative z-1 flex items-center justify-center">
            {/* Common Grid Shape */}
            <GridShape />
            <div className="flex max-w-xs flex-col items-center">
              <div className="mb-4">
                <LogoWhite />
              </div>
              <p className="text-center text-sm text-gray-300">
                Manage biodata, matches, and requests seamlessly with Matrimony
                Dashboard
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
