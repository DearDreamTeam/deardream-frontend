interface ProfileNameInputProps {
  name: string;
  onChange: (newName: string) => void;
}

const ProfileNameInput = ({ name, onChange }: ProfileNameInputProps) => {
  return (
    <div className="flex-start text-body-1 text-grey-400 flex flex-col gap-2">
      이름
      <input
        type="text"
        className="text-title-1 text-grey-700 placeholder:text-title-3 placeholder:text-grey-400 border-grey-300 w-80 border-b-1 border-solid py-2 focus:ring-0 focus:outline-none"
        placeholder="이름을 입력해주세요"
        value={name}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
export default ProfileNameInput;
