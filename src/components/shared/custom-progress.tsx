"use client";

import { Field, FieldLabel } from "@/components/ui/field";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

type CustomProgressProps ={
  number: number;
  title: string;
}

const CustomProgress = ({number,title}: CustomProgressProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Artificial delay to trigger animation
    const timer = setTimeout(() => setProgress(number), 300);
    return () => clearTimeout(timer);
  }, [number]);

  return (
    <Field className="w-full ">
      <FieldLabel
        htmlFor="progress-upload"
        className=" flex items-center justify-between text-primary"
      >
        <p className="text-body-xl font-medium">{title}</p>
        <p className="text-body-md text-text">{progress}%</p>
      </FieldLabel>
      <div className="px-1 ">
        <Progress value={progress} id="progress-upload" className="w-full rounded-full" />
      </div>
    </Field>
  );
};

export default CustomProgress;
