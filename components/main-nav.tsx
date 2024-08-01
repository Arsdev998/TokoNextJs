"use client";

import { cn } from "@/lib/utils";
import { Home, HomeIcon, NotebookIcon, Settings } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params = useParams();
  const routes = [
    {
      href: `/${params.storeId}`,
      label: "Dashboard",
      icon: <HomeIcon className="h-4 w-4"/>,
      active: pathname === `/${params.storeId}`,
    },
    {
      href: `/${params.storeId}/banner`,
      label: "Banners",
      icon: <NotebookIcon className="w-4 h-4" />,
      active: pathname === `/${params.storeId}/banner`,
    },
    {
      href: `/${params.storeId}/settings`,
      label: "Settings",
      icon: <Settings className="w-4 h-4" />,
      active: pathname === `/${params.storeId}/settings`,
    },
  ];
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {routes.map((route) => (
        <Link
          href={route.href}
          key={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary dark:hover:text-white flex items-center gap-x-[1px]",
            route.active
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          )}
        >
          {route.icon}
          {route.label}
        </Link>
      ))}
    </nav>
  );
}
