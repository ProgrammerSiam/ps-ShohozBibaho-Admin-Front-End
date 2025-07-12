import React from "react";
import ForgotPasswordForm from "./_components/ForgotPasswordForm";

export const metadata = {
  title: "Forgot Password | Shohoz Bibaho - Admin Dashboard",
  description:
    "Find your perfect life partner with Shohoz Bibaho. A trusted and easy-to-use matrimony platform.",
};

const ForgotPasswordPage = () => {
  return (
    <div className="flex w-full flex-1 flex-col lg:w-1/2">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 text-2xl font-semibold text-gray-800 md:text-3xl">
              Forgot Your Password?
            </h1>
            <p className="text-sm text-gray-500">
              Enter the email address linked to your account, and we’ll send you
              a link to reset your password.
            </p>
          </div>

          {/* forgot password form */}
          <ForgotPasswordForm />
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
