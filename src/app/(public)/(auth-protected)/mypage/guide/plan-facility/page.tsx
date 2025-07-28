"use client";

import Header from "@/components/common/header";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useState } from "react";

import { renderMessageWithLineBreaks } from "@/utils/render-message-with-line-breaks";

const PLAN_ITEM = [
  {
    title: "1단계",
    content: "마이페이지에서 ‘나의 정기구독’을 클릭하세요.",
  },
  {
    title: "2단계",
    content: "‘나의 정기구독’에서 ‘플랜 변경’을 클릭하세요.",
  },
  {
    title: "3단계",
    content: "‘기관 플랜’을 체크하고 ‘변경’을 클릭하세요.",
  },
  {
    title: "4단계",
    content: `개인플랜 구독권 월 8,900원을 카카오페이로 결제해주세요.`,
  },
  {
    title: "5단계",
    content: `집, 직장 등 받으실 주소를 자유롭게 입력하고\n‘저장'을 클릭하면 플랜 변경이 완료 됩니다.`,
  },
];

const GuidePlanPage = () => {
  const [curActiveIndex, setCurActiveIndex] = useState(0);
  return (
    <div className="bg-grey-0 flex h-full flex-1 flex-col items-center">
      <Header>이어드림 가이드</Header>
      <div className="w-full overflow-y-auto">
        <div className="flex w-full flex-col items-center py-6">
          <div className="text-headline-0 text-grey-900 py-2 leading-10">
            플랜 변경 가이드 (시설)
          </div>
          <div className="text-label-1 text-grey-500 text-center leading-normal">
            요양시설에서 가정으로 주소를 옮기고 싶어요.
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
            {PLAN_ITEM.map(({ title, content }, index) => (
              <SwiperSlide key={`mypage-${index}`}>
                <div className="bg-grey-50 flex flex-col items-center justify-center p-4">
                  <Image
                    src={`/images/guide/plan-${index + 1}.png`}
                    alt={`plan-${index + 1}`}
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
          {PLAN_ITEM.map((_, index) => (
            <div
              key={`plan-${index}`}
              className={`progress-dot ${index === curActiveIndex ? "bg-green-300" : "bg-grey-300"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GuidePlanPage;
