import UserAdd from "@/public/icons/invite/user-add.svg";
const InviteFamilyButton = () => {
  return (
    <button className="button w-fit">
      <UserAdd />
      <p>가족 초대하기</p>
    </button>
  );
};

export default InviteFamilyButton;
