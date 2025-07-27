"use client";
import StateTemplate from "@/components/template/state-template";
import MakeFamilyGroupButton from "@/components/button/make-family-group-button";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { renderMessageWithLineBreaks } from "@/utils/render-message-with-line-breaks";
import { useState } from "react";

const LETTERS_EXAMPLE_ITEM = [
  {
    title: "한 달간 가족들의 게시글이 모여요",
    content:
      "매달 첫 날부터 마지막 날까지의\n게시글들이 모여 어르신께 전달될 소식지로 들어가요",
    src: "feed.png",
    width: 266.4,
    height: 315.6,
  },
  {
    title: "소식지의 모습을 확인해요",
    content:
      "소식함 페이지에서 어르신께 전달될 소식지의 모습을\nPDF로 확인할 수 있어요",
    src: "letter.jpg",
    width: 223,
    height: 316,
  },
  {
    title: "어르신께는 인쇄된 소식지가 전달돼요",
    content:
      "이어드림이 어르신께서 쉽게 보실 수 있도록\n큰 글자로 인쇄하여 가족들의 마음을 전달할게요",
    src: "get.png",
    width: 454,
    height: 343,
  },
];

const NoFamilyGroup = () => {
  const [curActiveIndex, setCurActiveIndex] = useState(0);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="w-full">
        <Swiper
          loop={false}
          spaceBetween={3}
          slidesPerView={1}
          onSlideChange={(swiper) => setCurActiveIndex(swiper.activeIndex)}
          className="user-none h-full"
        >
          {LETTERS_EXAMPLE_ITEM.map(
            ({ title, content, src, width, height }, index) => (
              <SwiperSlide key={`letters-ex-${index}`}>
                <StateTemplate>
                  <Image
                    src={`/images/letters/${src}`}
                    alt={`letters-ex-${index}`}
                    width={width}
                    height={height}
                    className="min-h-[350px] py-4"
                  />

                  <StateTemplate.Title>{title}</StateTemplate.Title>
                  <StateTemplate.Content>
                    {renderMessageWithLineBreaks(content)}
                  </StateTemplate.Content>
                </StateTemplate>
              </SwiperSlide>
            ),
          )}
        </Swiper>
      </div>

      <div className="progress-dot-container py-8">
        {LETTERS_EXAMPLE_ITEM.map((_, index) => (
          <div
            key={`indicator-${index}`}
            className={`progress-dot ${index === curActiveIndex ? "bg-green-300" : "bg-grey-300"}`}
          />
        ))}
      </div>
      <MakeFamilyGroupButton />
    </div>
  );
};

export default NoFamilyGroup;
