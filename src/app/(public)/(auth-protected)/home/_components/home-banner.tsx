"use client";

import { PATH } from "@/constants/path";
import Link from "next/link";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const BANNER_ITEM = [
  {
    bgColor: "bg-grey-200",
    title: "이어드림 이용 방법 총정리",
    content: "글자수, 사진 첨부, 소식지 규격에 대해 궁금하신가요?",
  },
  {
    bgColor: "bg-green-100",
    title: "주소 이전 가이드 A to Z",
    content: "기관을 옮기셨나요? 걱정하지 마세요!",
  },
  {
    bgColor: "bg-grey-300",
    title: "가족 대표 변경 방법",
    content: "다른 분이 결제를 하시나요?",
  },
];

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
          speed={1800}
          loop={true}
          slidesPerView={1}
          onSlideChange={(swiper) => setCurActiveIndex(swiper.realIndex)}
          className="shadow-default"
        >
          {BANNER_ITEM.map(({ bgColor, title, content }, index) => (
            <SwiperSlide
              key={`banner-${index}`}
              className={`w-full ${bgColor} rounded-sm p-5`}
            >
              <Link href={PATH.MYPAGE}>
                <p className="text-body-2 text-grey-600">{content}</p>
                <p className="text-title-1 text-green-300">{title}</p>
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
