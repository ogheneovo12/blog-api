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

import { BookIcon, Home, Settings, User2 } from "lucide-react";
import { useSelector } from "react-redux";

export function AppSidebar() {
  const token = useSelector((state) => state.auth.accessToken);
  const location = useLocation();

  const items = [
    {
      title: "Home",
      url: "/",
      icon: Home,
    },
    {
      title: "My Posts",
      url: "/my-posts",
      icon: BookIcon,
      protected: true,
    },
    {
      title: "Profile",
      url: "/profile",
      icon: User2,
      protected: true,
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
              {items.map((item) =>
                item.protected && !token ? null : (
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
                )
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
