import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Folder,
  LayoutDashboardIcon,
  MapPinPlusInside,
  Plus,
} from "lucide-react";

function AppSideBar() {
  const menuItem = [
    {
      name: "Filing Chart",
      icon: <Folder></Folder>,
    },
    {
      name: "Curriculum",
      icon: <Folder></Folder>,
    },
    {
      name: "Students",
      icon: <Folder></Folder>,
    },
    {
      name: "Faculty",
      icon: <Folder></Folder>,
    },
  ];

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigate</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem key={"Dashboard"}>
                <SidebarMenuButton asChild>
                  <a href="">
                    <LayoutDashboardIcon></LayoutDashboardIcon>
                    <span>{"Dashboard"}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Menu Folder</SidebarGroupLabel>
          <SidebarGroupAction title="Add Folder">
            <Plus></Plus> <span className="sr-only">Add Folder</span>
          </SidebarGroupAction>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItem.map((m) => (
                <SidebarMenuItem>
                  <SidebarMenuButton key={m.name} asChild>
                    <a href="">
                      {m.icon}
                      <span>{m.name}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <span className="text-center">Welcome Admin!</span>
        <Button>Logout</Button>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSideBar;
