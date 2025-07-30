import Image from "next/image";
import Link from "next/link";
import AdminProfile from "./admin-profile";

const AdminHeader = () => {
  return (
    <section>
      <div className="bg-grey-0 border-b-grey-200 border-b">
        <div className="flex items-center justify-between px-12 py-4">
          <Link href={`/admin`}>
            <Image
              src={`/logo/logo.svg`}
              alt="logo"
              width={116.41}
              height={40.57}
            />
          </Link>

          <AdminProfile />
        </div>
      </div>
    </section>
  );
};

export default AdminHeader;
