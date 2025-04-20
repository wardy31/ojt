import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Outlet } from "react-router";
import AppSideBar from "./component/AppSideBar";

function ProtectedLayout() {
  return (
    <SidebarProvider open={true}>
      <AppSideBar></AppSideBar>
      <SidebarInset>
        <div className="mx-6 my-6">
          <Outlet></Outlet>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default ProtectedLayout;
