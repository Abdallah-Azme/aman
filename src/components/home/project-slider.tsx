"use client";

import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProjectCard from "./project-card";
import { ProjectItem } from "@/types/home";

const ProjectSlider = ({projects}:{projects:ProjectItem[]}) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="w-full">
      <Carousel setApi={setApi} className="w-full ">
        <CarouselContent>
          {projects?.map((project, index) => (
            <CarouselItem key={index} className="lg:basis-1/2 basis-[90%]">
              <ProjectCard project={project} key={index} number={index + 1}/>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex items-center justify-between  mt-4">
          {/* arrows */}
          <div className="flex items-center  ">
            <CarouselPrevious className="static translate-y-0 bg-transparent border-none shadow-none hover:bg-transparent hover:border-none hover:shadow-none ">
              <ChevronLeft className="rtl:rotate-180 size-7" />
            </CarouselPrevious>
            <CarouselNext className="static translate-y-0 bg-transparent border-none shadow-none hover:bg-transparent hover:border-none hover:shadow-none ">
              <ChevronRight className="rtl:rotate-180 size-7" />
            </CarouselNext>
          </div>
          {/* pagination */}
          <div className="text-text  text-body-xl">
            {current} / {count}
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default ProjectSlider;
