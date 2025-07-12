import { cn } from "@/lib/utils";
import React from "react";

const ErrorMessage = ({ className, children }) => {
  if (!children) return null;
  return (
    <p className={cn("pt-1.5 text-xs text-red-500", className)}>{children}</p>
  );
};

export default ErrorMessage;
