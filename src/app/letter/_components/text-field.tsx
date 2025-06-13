interface TextFieldProps {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
}

const TextField = ({ content, setContent }: TextFieldProps) => {
  const handleChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  return (
    <textarea
      className="text-label-2 flex-1 px-4 pb-4"
      value={content}
      onChange={handleChangeContent}
      placeholder="나만의 일상을 남기고 소식지로 선물해보세요!"
      maxLength={600}
    ></textarea>
  );
};

export default TextField;
