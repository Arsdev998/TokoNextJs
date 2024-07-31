import db from "@/lib/db";

interface DashboardProps {
  params: { storeId: string };
}
const DashboardPage = async ({ params }: DashboardProps) => {
  const store = await db.store.findFirst({ where: { id: params.storeId } });
  return (
    <div>
      This is Dashboard = {store?.name}
    </div>
  );
};

export default DashboardPage;
