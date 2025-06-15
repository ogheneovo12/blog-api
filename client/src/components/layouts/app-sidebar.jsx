import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router";

import { Home, Settings, User2 } from "lucide-react";

export function AppSidebar() {
  const location = useLocation();

  const items = [
    {
      title: "Home",
      url: "/app",
      icon: Home,
    },
    {
      title: "My Posts",
      url: "/app/users",
      icon: User2,
    },
    {
      title: "Profile",
      url: "/app/project-ideas",
      icon: Settings,
    },
  ];

  const { state } = useSidebar();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="my-5">
        <h2 className="text-center">
          {state === "expanded" ? "Daily Blog" : "DB"}
        </h2>{" "}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="body-text-sm">
            Application
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.url}
                    className="h-10"
                  >
                    <Link to={item.url}>
                      <item.icon size={48} />
                      <span className="body-text">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
