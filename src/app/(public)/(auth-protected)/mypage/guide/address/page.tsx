"use client";

import Header from "@/components/common/header";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useState } from "react";
import { renderMessageWithLineBreaks } from "@/utils/render-message-with-line-breaks";

const MYPAGE_ITEM = [
  {
    title: "1단계",
    content: "마이페이지에서 ‘나의 정기구독’을 클릭하세요.",
  },
  {
    title: "2단계",
    content: "주소 변경 버튼을 클릭하세요.",
  },
  {
    title: "3단계",
    content: "새로운 주소를 입력하여 언제든지 주소를 변경할 수 있어요.",
  },
];

const GuideAddressPage = () => {
  const [curActiveIndex, setCurActiveIndex] = useState(0);
  return (
    <div className="bg-grey-0 flex h-full flex-1 flex-col items-center">
      <Header>이어드림 가이드</Header>

      <div className="overflow-auto-hide-scroll w-full">
        <div className="flex w-full flex-col items-center py-6">
          <div className="text-headline-0 text-grey-900 py-2 leading-10">
            주소 이전 가이드
          </div>
          <div className="text-label-1 text-grey-500 leading-normal">
            주소는 어떻게 변경하나요?
          </div>
        </div>
        <div className="text-title-1 text-grey-800 w-full px-4 py-5 text-left leading-normal">
          이렇게 변경해보세요
        </div>

        <div className="flex w-full max-w-[768px] flex-1 flex-col justify-center">
          <Swiper
            loop={false}
            spaceBetween={3}
            slidesPerView={1}
            onSlideChange={(swiper) => setCurActiveIndex(swiper.activeIndex)}
            className="h-auto w-full"
          >
            {MYPAGE_ITEM.map(({ title, content }, index) => (
              <SwiperSlide key={`mypage-${index}`}>
                <div className="bg-grey-50 flex flex-col items-center justify-center p-4">
                  <Image
                    src={`/images/guide/mypage-${index + 1}.png`}
                    alt={`mypage-${index + 1}`}
                    width={200}
                    height={200}
                  />
                  <div className="text-title-1 text-grey-800 py-3 text-left leading-normal">
                    {title}
                  </div>
                  <div className="text-body-2 text-grey-700 leading-normal">
                    {renderMessageWithLineBreaks(content)}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="progress-dot-container py-6">
          {MYPAGE_ITEM.map((_, index) => (
            <div
              key={`mypage-${index}`}
              className={`progress-dot ${index === curActiveIndex ? "bg-green-300" : "bg-grey-300"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GuideAddressPage;
