const PdfLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div className="bg-grey-500 h-full">{children}</div>;
};

export default PdfLayout;
