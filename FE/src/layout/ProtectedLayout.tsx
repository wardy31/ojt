import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Outlet, useNavigate } from "react-router";
import AppSideBar from "./component/AppSideBar";
import useAuth from "@/hooks/useAuth";
import { useEffect } from "react";

function ProtectedLayout() {
  const navigate = useNavigate();
  useEffect(() => {
    const isLogin = useAuth();
    console.log("isLogin",isLogin);

    if (!isLogin) {
      navigate("/login");
    }
  }, []);

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
