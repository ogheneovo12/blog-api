import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layouts/app-sidebar";
import { Outlet } from "react-router";
import { UserAvatarDropdown } from "../ProfileDropDown";
import LoginModal from "../LoginModal";
import SignupModal from "../SignupModal";

export default function AppLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full black/5">
        <header className=" sticky top-0 shadow-sm w-full min-h-[70px] bg-sidebar flex justify-between items-center px-4 lg:px-14">
          <SidebarTrigger />
          <div className="flex space-x-3 items-center">
            <UserAvatarDropdown />
          </div>
        </header>
        <div className="p-4 lg:p-14 w-full">
          <Outlet />
          <LoginModal />
          <SignupModal />
        </div>
      </main>
    </SidebarProvider>
  );
}
