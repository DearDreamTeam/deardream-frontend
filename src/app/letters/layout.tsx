const PostboxLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex h-full flex-col">
      <header className="text-title-1 bg-grey-0 border-b-grey-200 border-b px-4 py-[0.66rem]">
        소식함
      </header>
      {children}
    </div>
  );
};

export default PostboxLayout;
