import React from "react";
import LoginForm from "./_components/LoginForm";

export const metadata = {
  title: "Login | Shohoz Bibaho - Admin Dashboard",
  description:
    "Find your perfect life partner with Shohoz Bibaho. A trusted and easy-to-use matrimony platform.",
};

const LoginPage = () => {
  return (
    <div className="flex w-full flex-1 flex-col lg:w-1/2">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 text-2xl font-semibold text-gray-800 md:text-3xl">
              Login
            </h1>
            <p className="text-sm text-gray-500">
              Enter your email and password to login!
            </p>
          </div>

          {/* login form */}
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
