"use client";

import Link from "next/link";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Image from "next/image";
import { BANNER_ITEM } from "@/constants/banner-item";

const HomeBanner = () => {
  const [curActiveIndex, setCurActiveIndex] = useState(0);

  return (
    <div className="flex flex-col gap-2 px-4 py-3">
      <div>
        <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          spaceBetween={16}
          speed={1800}
          loop={true}
          slidesPerView={1}
          onSlideChange={(swiper) => setCurActiveIndex(swiper.realIndex)}
          className="h-[6.25rem]"
        >
          {BANNER_ITEM.map(({ title, content, href }, index) => (
            <SwiperSlide
              key={`banner-${index}`}
              className={`shadow-default relative z-20 w-full rounded-sm bg-green-200 pt-[1.36rem] pl-[0.91rem] text-green-300`}
            >
              <Link href={href}>
                <Image
                  src={`/images/white-big-ribbon.svg`}
                  alt="ribbon-bg"
                  width={284.23}
                  height={250.49}
                  className="absolute -top-[4.45rem] -left-[0.94rem] z-20 opacity-20"
                />
                <p className="text-caption-1 relative z-40">{content}</p>
                <p className="text-guide-title relative z-40">{title}</p>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="progress-dot-container gap-2">
        {BANNER_ITEM.map((_, index) => (
          <div
            key={`home-banner-${index}`}
            className={`progress-dot ${index === curActiveIndex ? "bg-green-300" : "bg-grey-200"} h-1.5 w-1.5`}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeBanner;
