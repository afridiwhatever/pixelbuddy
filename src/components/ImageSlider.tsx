"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import type SwiperType from "swiper";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageSliderProps {
  urls: string[];
}

const ImageSlider = ({ urls }: ImageSliderProps) => {
  const [swiper, setSwiper] = useState<null | SwiperType>(null);

  return (
    <div className="relative aspect-square rounded-xl overflow-hidden group">
      <Swiper
        className="h-full w-full"
        onSwiper={(swiper) => setSwiper(swiper)}
      >
        {urls.map((url, i) => (
          <SwiperSlide key={i} className="relative">
            <Image
              fill
              loading="eager"
              className="object-cover object-center rounded-xl"
              src={url}
              alt="Product image"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {urls.length > 1 && (
        <div className="absolute top-1/2 z-50 w-full px-2 flex justify-between -translate-y-1/2 invisible transition animate ease-in group-hover:visible">
          <button
            onClick={(e) => {
              e.preventDefault();
              swiper?.slidePrev();
            }}
          >
            <ChevronLeft className="h-8 w-8  p-2 bg-white rounded-full" />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              swiper?.slideNext();
            }}
          >
            <ChevronRight className="h-8 w-8 p-2 bg-white rounded-full" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageSlider;
