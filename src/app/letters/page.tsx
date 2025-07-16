import PostboxViewer from "./_components/postbox-viewer/postbox-viewer";

const page = () => {
  return (
    <div className="flex h-full flex-col">
      <header className="text-title-1 header py-[0.66rem]">소식함</header>

      <PostboxViewer />
    </div>
  );
};

export default page;
