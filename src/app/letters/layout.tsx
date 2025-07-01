const PostboxLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex h-full flex-col">
      <header className="text-title-1 bg-gray-0 border-b border-b-gray-200 px-4 py-[0.66rem]">
        소식함
      </header>
      {children}
    </div>
  );
};

export default PostboxLayout;
