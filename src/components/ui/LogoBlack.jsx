import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import logoBlack from "../../../public/images/logo/pink-logo.png";

const LogoBlack = ({ className }) => {
  return (
    <Link href="/">
      <Image
        className={cn(
          "h-auto max-w-[120px] object-cover md:max-w-[200px]",
          className,
        )}
        src={logoBlack}
        alt="Shohoz Bibaho"
        priority
      />
    </Link>
  );
};

export default LogoBlack;
