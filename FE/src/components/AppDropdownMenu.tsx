import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Ellipsis,
  Folder,
  LayoutDashboardIcon,
  MapPinPlusInside,
  MoreHorizontal,
  Plus,
} from "lucide-react";
import { SidebarMenuAction } from "./ui/sidebar";
function AppDropdownMenu({
  handleEditDialog,
  open,
  onOpenChange,
  onChangeId,
  handleDeleteDialog,
}) {
  return (
    <DropdownMenu open={open} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>
        <SidebarMenuAction onClick={onChangeId}>
          <MoreHorizontal />
        </SidebarMenuAction>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right" align="start">
        <DropdownMenuItem onClick={handleEditDialog}>
          <span>Edit Folder</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDeleteDialog}>
          <span>Delete Folder</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default AppDropdownMenu;
