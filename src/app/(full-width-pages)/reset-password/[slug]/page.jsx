import React from "react";
import ResetPasswordForm from "./_components/ResetPasswordForm";

export const metadata = {
  title: "Reset Password | Shohoz Bibaho - Admin Dashboard",
  description:
    "Find your perfect life partner with Shohoz Bibaho. A trusted and easy-to-use matrimony platform.",
};

const ResetPasswordPage = async ({ params }) => {
  const { slug } = await params;

  return (
    <div className="flex w-full flex-1 flex-col lg:w-1/2">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 text-2xl font-semibold text-gray-800 md:text-3xl">
              Set New Password
            </h1>
            <p className="text-sm text-gray-500">
              Enter your new password below to complete the reset process.
            </p>
          </div>

          {/* reset password form */}
          <ResetPasswordForm resetToken={slug} />
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
