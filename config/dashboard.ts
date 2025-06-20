import { UserRole } from "@prisma/client";

import { SidebarNavItem } from "types";

export const sidebarLinks: SidebarNavItem[] = [
  {
    title: "TREND",
    items: [
      { href: "/dashboard", icon: "dashboard", title: "Dashboard" },
      {
        href: "/dashboard/databases",
        icon: "database",
        title: "Databases",
        authorizeOnly: UserRole.USER,
      },
      { href: "/dashboard/analytics", icon: "trend", title: "Analytics" },
      { href: "/dashboard/tracking", icon: "radar", title: "Tracking" },
      { href: "/dashboard/product", icon: "product", title: "Product" },
      { href: "/dashboard/meta", icon: "packagesearch", title: "Meta" },

    ],
  },
  {
    title: "OPTIONS",
    items: [
      { href: "/dashboard/settings", icon: "settings", title: "Settings" },
      { href: "/", icon: "home", title: "Homepage" },
      { href: "/docs", icon: "bookOpen", title: "Documentation" },
    ],
  },
];
