import AdminHeader from "./_components/header/admin-header";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="w-screen">
      <AdminHeader />
      {children}
    </div>
  );
};

export default Layout;
