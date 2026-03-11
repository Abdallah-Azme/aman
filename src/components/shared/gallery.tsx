"use client";
import LightGallery from "lightgallery/react";

import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import Image from "next/image";

export default function Gallery() {
  const images = Array.from({ length: 5 }).map(() => "/gallery.png");

  return (
    <div className="w-full">
      <LightGallery
        speed={500}
        plugins={[lgThumbnail, lgZoom]}
        selector="a"
        download={false}
      >
        <div className="flex flex-wrap gap-4">
          {images.map((src, index) => (
            <a
              key={index}
              href={src}
              data-src={src}
              data-sub-html={`<h4>Image ${index + 1}</h4>`}
              className="group relative overflow-hidden rounded-xl
                         lg:flex-[0_0_calc(33.333%-1rem)] md:flex-[0_0_calc(50%-1rem)] flex-[0_0_calc(100%-1rem)] grow!"
            >
              <div className="relative w-full lg:max-h-65 md:max-h-52 h-48">
                <Image
                  src={src}
                  alt={`img-${index}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
            </a>
          ))}
        </div>
      </LightGallery>
    </div>
  );
}
