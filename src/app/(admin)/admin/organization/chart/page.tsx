import ArrowBack from "@/public/icons/common/arrow_back_ios.svg";
import ArrowFront from "@/public/icons/common/arrow_front_ios.svg";

import Icon0 from "@/public/icons/admin/icon-0.svg";
import Icon1 from "@/public/icons/admin/icon-1.svg";
import Icon2 from "@/public/icons/admin/icon-2.svg";
import Icon3 from "@/public/icons/admin/icon-3.svg";
import Image from "next/image";

const DATA = [
  {
    title: "등록 수령자 인원",
    statistic: "27 / 30",
    caption: "등록 인원 / 구매 인원",
    icon: Icon0,
  },
  {
    title: "소식 책자 수령 인원",
    statistic: "23 / 27",
    caption: "수령 인원 / 등록 인원",
    icon: Icon1,
  },
  {
    title: "참여 가족 인원",
    statistic: "132",
    caption: "등록 인원의 가족구성원",
    icon: Icon2,
  },
  {
    title: "진행 현황",
    statistic: "배송 중",
    caption: "2025-06-25 마감 완료",
    icon: Icon3,
  },
];

const DATA2 = [
  { name: "박영순", recentWrite: "2025-05-11" },
  { name: "이옥희", recentWrite: "2025-04-32" },
  { name: "윤순자", recentWrite: "2025-04-11" },
  { name: "박영숙", recentWrite: "2025-06-01" },
];

const Page = () => {
  return (
    <div className="h-full px-10 pb-8">
      <section className="flex w-full flex-col items-center justify-center pt-8">
        <div className="text-headline-0 text-grey-700 flex gap-4">
          <button>
            <ArrowBack />
          </button>
          <button>
            {2025}년 {6}월
          </button>
          <button>
            <ArrowFront />
          </button>
        </div>

        <div className="text-body-2 self-end px-4 pt-5 pb-7">
          마지막 업데이트: 2025-06-26 12:05
        </div>
      </section>

      <section className="flex gap-6">
        {DATA.map(({ title, statistic, caption, icon: Icon }) => (
          <div
            key={title}
            className="shadow-default flex flex-1 flex-col gap-3 rounded-[14px] p-4"
          >
            <h3 className="text-title-1 text-grey-800">{title}</h3>
            <div className="flex justify-between">
              <div>
                <div className="text-headline-0 text-grey-700">{statistic}</div>
                <div className="text-body-2 text-grey-600">{caption}</div>
              </div>
              <Icon />
            </div>
          </div>
        ))}
      </section>

      <section className="flex gap-6 pt-5">
        <div className="shadow-default flex flex-1 flex-col gap-12 rounded-lg px-5">
          <h2 className="organization-info-title pt-9">소식 책자 수령 인원</h2>
          <Image
            src={`/icons/admin/chart-stick.png`}
            alt="chart"
            width={506}
            height={234}
            className="self-center"
          />
        </div>

        <div className="shadow-default flex-1 rounded-lg px-5">
          <h2 className="organization-info-title pt-9 pb-9">
            소식 책자 미발행자
          </h2>

          <div className="flex flex-col gap-3">
            <h3 className="text-label-1 flex justify-between">
              <span className="w-16">이름</span>
              <span className="">최신 작성일</span>
              <span className="opacity-0">
                <ArrowFront />
              </span>
            </h3>
            {DATA2.map(({ name, recentWrite }) => (
              <div key={name} className="flex justify-between">
                <span className="w-16">{name}</span>
                <span className="">{recentWrite}</span>
                <button type="button" className="text-grey-700">
                  <ArrowFront />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
