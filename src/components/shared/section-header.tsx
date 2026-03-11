import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  title: string;
  description: string;
  className?: string;
};

const SectionHeader = ({
  title,
  description,
  className="",
}: Props) => {
  return (
    <div className={cn("max-lg:text-center", className)}>
      <h2 className="lg:text-body-xl text-body-lg text-gradient">{title}</h2>
      <p className="lg:text-h2 text-h4">{description}</p>
    </div>
  );
};

export default SectionHeader;
