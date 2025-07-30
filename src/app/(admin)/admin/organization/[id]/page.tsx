"use client";

import { useOrganAdminStore } from "@/stores/admin/useOrganizationAdminStore";
import { use } from "react";
import Back from "@/public/icons/admin/back.svg";
import Chart from "@/public/icons/admin/chart-circle.svg";
import { useRouter } from "next/navigation";

const MEMBER = [
  {
    name: "김영옥",
    relation: "딸",
    feed: 7,
    color: "bg-[#14B8A6]",
  },
  {
    name: "김미영",
    relation: "딸",
    feed: 4,
    color: "bg-[#F5E50B]",
  },
  {
    name: "이상형",
    relation: "아들",
    feed: 3,
    color: "bg-[#EC4899]",
  },
  {
    name: "이건희",
    relation: "손자",
    feed: 2,
    color: "bg-[#3B82F6]",
  },
  {
    name: "이하윤",
    relation: "손녀",
    feed: 1,
    color: "bg-[#6366F1]",
  },
];

const STATE_LABEL = {
  PENDING: "준비 중",
  error: "미발행",
  DELIVERING: "배송 중",
  DELIVERED: "배송 완료",
};

const Detail = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const { families } = useOrganAdminStore();
  const router = useRouter();
  const { receiverName, createdAt, deliveryStatus, phone } =
    families[Number(id) - 1];

  return (
    <div className="h-full px-16">
      <button type="button" onClick={() => router.back()} className="pt-6">
        <Back />
      </button>
      <h1 className="text-headline-0 text-grey-700 pt-4 pb-6">
        {receiverName}님
      </h1>

      <div className="flex gap-16">
        <div className="organization-info-section">
          <h2 className="organization-info-title">이용자 정보</h2>
          <div className="organization-info-content">
            <div className="flex justify-between">
              <span>이용시작일</span>
              <span>{createdAt.slice(0, -3)}</span>
            </div>
            <div className="flex justify-between">
              <span>전화번호</span>
              <span>{phone}</span>
            </div>
            <div className="flex justify-between">
              <span>책자상태</span>
              <span>
                {STATE_LABEL[deliveryStatus as keyof typeof STATE_LABEL]}
              </span>
            </div>
          </div>
        </div>

        <div className="organization-info-section">
          <h2 className="organization-info-title">최근 3개월 발송 이력</h2>
          <div className="organization-info-content">
            <div className="flex justify-between">
              <span>2025년 5월호 </span>
              <span>소식 5개/20개</span>
              <span className="w-16 text-end">발송 완료</span>
            </div>
            <div className="flex justify-between">
              <span>2025년 4월호 </span>
              <span>소식 5개/20개</span>
              <span className="w-16 text-end">발송 완료</span>
            </div>
            <div className="flex justify-between">
              <span>2025년 3월호 </span>
              <span>소식 0개/20개</span>
              <span className="w-16 text-end">미발송</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-16 pt-[4.75rem]">
        <div className="organization-info-section">
          <h2 className="organization-info-title">2025년 6월 소식 책자 현황</h2>

          <div className="flex items-center gap-8">
            <div className="px-8">
              <Chart />
            </div>
            <div className="flex-1">
              <div className="text-body-1 border-b-grey-200 flex justify-between border-b py-1.5">
                <div className="flex items-center gap-3">
                  <div className={`bg-white} h-3 w-3 rounded-full`}></div>
                  <span className="flex-1">작성자</span>
                </div>
                <span className="w-[5.58rem] text-end">개수</span>
              </div>

              <div className="organization-info-content">
                {MEMBER.map(({ name, color, feed }) => (
                  <div
                    key={`${color}-feed`}
                    className="flex items-center justify-between py-0.5"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`h-3 w-3 rounded-full ${color}`}></div>
                      <span className="text-body-2">{name}</span>
                    </div>
                    <span className="text-body-1 w-[5.58rem] text-end">
                      {feed}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="organization-info-section">
          <h2 className="organization-info-title">가족구성원 정보</h2>
          <div className="text-body-1 flex">
            <span className="w-40">이름</span>
            <span className="flex-1">관계</span>
          </div>

          <div className="organization-info-content">
            {MEMBER.map(({ name, relation }, index) => (
              <div key={index} className="flex justify-between">
                <span className="w-40">{name} </span>
                <span className="flex-1">{relation}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
