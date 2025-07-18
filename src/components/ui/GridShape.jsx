import Image from "next/image";
import React from "react";
import gridShape from "../../../public/images/shape/grid-01.svg";

const GridShape = () => {
  return (
    <>
      <div className="absolute top-0 right-0 -z-1 w-full max-w-[250px] xl:max-w-[450px]">
        <Image width={540} height={254} src={gridShape} alt="grid" />
      </div>
      <div className="absolute bottom-0 left-0 -z-1 w-full max-w-[250px] rotate-180 xl:max-w-[450px]">
        <Image width={540} height={254} src={gridShape} alt="grid" />
      </div>
    </>
  );
};

export default GridShape;
