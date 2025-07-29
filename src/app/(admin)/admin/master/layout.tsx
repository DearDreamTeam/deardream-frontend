import AdminHeader from "../_components/header/admin-header";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="w-dvw">
      <AdminHeader />
      <div className="px-36 py-20">{children}</div>
    </div>
  );
};

export default Layout;
