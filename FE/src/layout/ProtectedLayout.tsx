import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router";
import AppSideBar from "./component/AppSideBar";

function ProtectedLayout() {
  return (
    <SidebarProvider>
      <AppSideBar></AppSideBar>
      <main>
        <SidebarTrigger></SidebarTrigger>
        <div className="m-6">
          <Outlet></Outlet>
        </div>
      </main>
    </SidebarProvider>
  );
}

export default ProtectedLayout;
