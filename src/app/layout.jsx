import AuthLoader from "@/providers/AuthLoader";
import ReduxProvider from "@/providers/ReduxProvider";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Shohoz Bibaho - Admin Dashboard",
  description:
    "Find your perfect life partner with Shohoz Bibaho. A trusted and easy-to-use matrimony platform.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} text-sm antialiased md:text-base`}>
        <ReduxProvider>
          <AuthLoader />
          <main>{children}</main>
          <Toaster />
        </ReduxProvider>
      </body>
    </html>
  );
}
