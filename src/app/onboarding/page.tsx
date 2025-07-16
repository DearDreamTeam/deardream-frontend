"use client";

import Landing from "@/components/landing/landing";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { renderMessageWithLineBreaks } from "@/utils/render-message-with-line-breaks";
import { useEffect, useState } from "react";
import Link from "next/link";
import { PATH } from "@/constants/path";

const ONBOARDING_ITEM = [
  {
    title: "일상의 조각들이 모여요",
    content: "한 줄의 안부와 사진 한 장, 그걸로 충분해요",
  },
  {
    title: "작은 소식이 큰 선물이 돼요",
    content: "이어드림이 모두의 안부를 모아\n소중한 분께 전해드릴게요",
  },
  {
    title: "보고 싶을 때 언제든 꺼내봐요",
    content:
      "서로 멀리 떨어져 있어도,\n이어드림과 함께라면 언제든 이어질수 있어요",
  },
];

const Onboarding = () => {
  const [isLanding, setIsLanding] = useState(true);
  const [curActiveIndex, setCurActiveIndex] = useState(0);
  const isButtonActive = curActiveIndex === ONBOARDING_ITEM.length - 1;

  useEffect(() => {
    setTimeout(() => setIsLanding(false), 2000);
  }, []);

  return isLanding ? (
    <Landing />
  ) : (
    <div className="bg-grey-0 flex h-full w-full flex-col justify-between px-4">
      <div className="flex-1">
        <Swiper
          loop={false}
          spaceBetween={3}
          slidesPerView={1}
          onSlideChange={(swiper) => setCurActiveIndex(swiper.activeIndex)}
          className="user-none h-full"
        >
          {ONBOARDING_ITEM.map(({ title, content }, index) => (
            <SwiperSlide key={`onboarding-${index}`}>
              <Image
                src={`/images/onboarding/onboarding-${index + 1}.svg`}
                alt={`onboarding-${index + 1}`}
                width={129.43}
                height={109.49}
                className="mx-auto h-auto py-[5.87rem] pt-64"
                priority
              />
              <div className="flex flex-col items-center gap-2">
                <h1 className="text-headline-1">{title}</h1>
                <p className="text-label-2 text-center">
                  {renderMessageWithLineBreaks(content)}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="progress-dot-container py-[3.6rem]">
        {isButtonActive ? (
          <Link href={PATH.LOGIN} className="button w-full">
            시작하기
          </Link>
        ) : (
          ONBOARDING_ITEM.map((_, index) => (
            <div
              key={`indicator-${index}`}
              className={`progress-dot ${index === curActiveIndex ? "bg-green-300" : "bg-grey-300"}`}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Onboarding;
