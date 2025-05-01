import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { SidebarMenuAction } from "./ui/sidebar";
function AppDropdownMenu({
  handleEditDialog,
  open,
  onOpenChange,
  onChangeId,
  handleDeleteDialog,
  isPath,
}) {

  return (
    <DropdownMenu open={open} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <SidebarMenuAction
          className={`text-white hover:text-white hover:bg-indigo-700 ${
            isPath ? "bg-white text-black" : ""
          }`}
          onClick={onChangeId}
        >
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
