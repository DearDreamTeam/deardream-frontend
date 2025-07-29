import AdminHeader from "../_components/header/admin-header";
import Navigation from "./_components/side-header/navigation";
import OrganizationInfo from "./_components/side-header/organization-info";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex">
      <section className="shadow-default w-60 bg-green-300">
        <OrganizationInfo />
        <Navigation />
      </section>

      <section className="flex flex-1 flex-col">
        <AdminHeader />
        {children}
      </section>
    </div>
  );
};

export default Layout;
