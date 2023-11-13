import { UserButton } from "@clerk/nextjs";

const DashboardPage = () => {
  return (
    <div>
      DashboardPage (Protected)
      <div>
        <UserButton afterSignOutUrl="/"/>
      </div>
    </div>
  );
};

export default DashboardPage;
