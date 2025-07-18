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
      className="text-title-3 flex-1 p-4"
      value={content}
      onChange={handleChangeContent}
      placeholder="나만의 일상을 남기고 소식지로 선물해보세요!"
    ></textarea>
  );
};

export default TextField;
