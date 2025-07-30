import TextMessage from "@/public/icons/share-options/chat_bubble.svg";
import KakaoTalk from "@/public/icons/share-options/kakao_logo.svg";
import Mail from "@/public/icons/share-options/email.svg";
import Share from "@/public/icons/share-options/share.svg";
import { useUserStore } from "@/stores/useUserInfoStore";
import { useReceiverStore } from "@/stores/useReceiverStore";

const CLIENT_URL = process.env.NEXT_PUBLIC_CLIENT_URL;

export const SHARE_DATA = {
  title: "이어드림 가족 초대",
  text: `${useUserStore.getState().userProfile.name}님과 함께 소식지 만들기에 동참해보세요!`,
  url: CLIENT_URL + "invite?familylink=",
};

const SHARE_ACTIONS = {
  /* 문자 */
  handleShareSMS: (familyLink: string) => {
    const smsLink = `sms:?body=${encodeURIComponent(`[${SHARE_DATA.title}] ${SHARE_DATA.text} ${SHARE_DATA.url + familyLink}`)}`;
    window.location.href = smsLink;
  },

  /* 메일 */
  handleShareEmail: (familyLink: string) => {
    const mailtoLink = `mailto:?subject=${encodeURIComponent(SHARE_DATA.title)}&body=${encodeURIComponent(`${SHARE_DATA.text} ${SHARE_DATA.url + familyLink}`)}`;
    window.location.href = mailtoLink;
  },

  /* 더보기 */
  handleShareMore: (familyLink: string) => {
    const NEW_SHARE_DATA = { ...SHARE_DATA, url: SHARE_DATA.url + familyLink };
    if (navigator.share) {
      navigator.share(NEW_SHARE_DATA);
    } else {
      alert("이 브라우저는 공유 기능을 지원하지 않습니다.");
    }
  },

  /* 카카오톡 kakao share sdk */
  handleShareKakao: (familyLink: string) => {
    if (!window.Kakao) {
      console.log("kakao sdk load fail");
      return;
    }
    window.Kakao.Share.sendCustom({
      templateId: 122390,
      templateArgs: {
        hostName: `${useUserStore.getState().userProfile.name}`,
        receiverName: `${useReceiverStore.getState().receiver.name}`,
        familyLink: `${familyLink}`,
      },
    });
  },
};

export const SHARE_OPTION_ITEMS = [
  {
    icon: TextMessage,
    label: "문자",
    action: (familyLink: string) => SHARE_ACTIONS.handleShareSMS(familyLink),
  },
  {
    icon: KakaoTalk,
    label: "카카오톡",
    action: (familyLink: string) => SHARE_ACTIONS.handleShareKakao(familyLink),
  },
  {
    icon: Mail,
    label: "이메일",
    action: (familyLink: string) => SHARE_ACTIONS.handleShareEmail(familyLink),
  },
  {
    icon: Share,
    label: "더보기",
    action: (familyLink: string) => SHARE_ACTIONS.handleShareMore(familyLink),
  },
];
