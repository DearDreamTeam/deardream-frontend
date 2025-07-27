export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="overflow-auto-hide-scroll mx-auto h-full w-full max-w-[768px]">
      {children}
    </div>
  );
}
