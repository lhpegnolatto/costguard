import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  ChartAreaIcon,
  Settings2Icon,
  CircleHelpIcon,
  SearchIcon,
  LightbulbIcon,
  ShieldIcon,
} from "lucide-react";

const data = {
  user: {
    name: "Luiz Henrique Pegnolatto",
    email: "lhpegnolatto@gmail.com",
    avatar: "https://github.com/lhpegnolatto.png",
  },
  navMain: [
    {
      title: "Analytics",
      url: "/",
      icon: <ChartAreaIcon />,
    },
    {
      title: "Insights",
      url: "/insights",
      icon: <LightbulbIcon />,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: <Settings2Icon />,
    },
    {
      title: "Get Help",
      url: "#",
      icon: <CircleHelpIcon />,
    },
    {
      title: "Search",
      url: "#",
      icon: <SearchIcon />,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2 p-2">
            <ShieldIcon className="size-5!" />
            <span className="text-base font-semibold">CostGuard</span>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
