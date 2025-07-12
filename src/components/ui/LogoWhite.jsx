import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import logoWhite from "../../../public/images/logo/white-logo.png";

const LogoWhite = ({ className }) => {
  return (
    <Link href="/">
      <Image
        className={cn(
          "h-auto max-w-[120px] object-cover md:max-w-[200px]",
          className,
        )}
        src={logoWhite}
        alt="Shohoz Bibaho"
        priority
      />
    </Link>
  );
};

export default LogoWhite;
