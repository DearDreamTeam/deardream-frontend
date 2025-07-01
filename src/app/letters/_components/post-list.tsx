import Image from "next/image";

const PostList = () => {
  return (
    <div className="flex flex-wrap justify-between gap-x-3 gap-y-[2.12rem] py-7">
      {Array.from({ length: 10 }).map((_, index) => (
        <div key={index}>
          <Image src={`/mock/Cover.png`} alt="cover" width={104} height={148} />
          <span>2025년 4월 호</span>
        </div>
      ))}
    </div>
  );
};

export default PostList;
