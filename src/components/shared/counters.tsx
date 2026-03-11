"use client";
import Image from "next/image";
import CountUp from "react-countup";

interface CountersProps {
  counters: {
    title: string;
    number: number;
  }[];
}
const Counters = ({ counters }: CountersProps) => {
  return (
    <div className="container flex items-center justify-between max-lg:flex-wrap border-t border-gray-200 pt-2">
      {counters.map((counter) => (
        <div key={counter.title}>
          <div  className="flex flex-col items-center max-lg:w-1/2">
            <div className="text-h2 font-bold">
              <CountUp end={counter.number} duration={2} />+
            </div>
            <p className="text-body-xl text-gray-400">{counter.title}</p>
          </div>
          <Image
            src="/counter-seperator.svg"
            alt="statistics"
            width={200}
            height={200}
            className="size-20  last:hidden max-lg:hidden"
          />
        </div>
      ))}
    </div>
  );
};

export default Counters;
