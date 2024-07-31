import { UserButton } from "@clerk/nextjs";
import { MainNav } from "./main-nav";
import StoreSwitcher from "./store-switcher";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import db from "@/lib/db";

const Navbar = async () => {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const store = await db.store.findMany({
    where: { userId },
  });
  return (
    <section className="bg-neutral-300 w-full ">
      <div className="flex h-14 items-center px-4">
        <StoreSwitcher items={store}/>
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </section>
  );
};

export default Navbar;
