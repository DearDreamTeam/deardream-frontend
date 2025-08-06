export const NOTIFICATION_MESSAGES = {
  TEXT_LIMIT_INVALID: {
    WITH_IMAGES: {
      title: "큰 글자 인쇄를 위해 제한이 있어요",
      content:
        "가독성 높은 큰 글씨로 인쇄되도록\n200자 이상 글은 사진과 함께 올릴 수 없어요.\n글을 줄이거나 사진을 빼볼까요?",
    },
    WITHOUT_IMAGES: {
      title: "큰 글자 인쇄를 위해 제한이 있어요",
      content:
        "가독성 높은 큰 글씨로 인쇄되도록\n600자 이상의 글은 올릴 수 없어요\n글을 줄여볼까요?",
    },
  },

  WRITE_CANCEL_WARNING: {
    NEW: {
      title: "작성 취소 시 복구할 수 없어요",
      content: "저장하지 않은 내용은 사라져요\n그래도 취소하시겠어요?",
    },
    EDIT: {
      title: "수정 취소 시 복구할 수 없어요",
      content: "저장하지 않은 내용은 사라져요\n그래도 취소하시겠어요?",
    },
  },

  DELETE_POST: {
    title: "삭제 시 복구할 수 없어요",
    content: "한 번 삭제하면 다시 되돌릴 수 없어요\n그래도 삭제하시겠어요?",
  },

  CANNOT_ADD_MORE_IMAGES: {
    title: "사진 첨부가 제한돼요",
    content: "사진은 최대 2장까지만 선택할 수 있어요",
  },

  REJECT_POST: {
    FRONT: {
      title: "이번 달 소식이 가득 찼어요",
      content:
        "이번 달엔 소식을 20개 모두 작성하셨어요\n다음 달에 따뜻한 마음을 다시 전해 주세요",
    },
    BACK: {
      title: "이번 달 소식이 마감되었어요",
      content:
        "방금 다른 가족이 마지막 소식을 작성했어요\n다음 달에 따뜻한 마음을 다시 전해 주세요\n홈으로 이동합니다",
    },
  },

  NO_FAMILY: {
    WRITE: {
      title: "가족 그룹을 만들어주세요",
      contnet:
        "소식을 작성하려면 가족 그룹이 필요해요\n가족 그룹을 만들러 가볼까요?",
    },
  },

  REJECT_IMAGE_EDIT: {
    title: "새로 올린 이미지만 수정할 수 있어요",
    content:
      "이미 올렸던 이미지는 아직 삭제만 가능해요\n 새로 올린 이미지는 수정할 수 있어요",
  },
};
