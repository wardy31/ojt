import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";

interface props {
  open: boolean;
  onOpenChange: (d: any) => void;
  onRenameDialog: () => void;
  onDeleteDialog: () => void;
  onChangeId?: () => void;
}

function FolderDropdownMenu({
  open,
  onOpenChange,
  onRenameDialog,
  onDeleteDialog,
  onChangeId,
}: props) {
  return (
    <DropdownMenu open={open} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger className="hover:text-indigo-700">
        <EllipsisVertical></EllipsisVertical>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={onRenameDialog}>
          <span>Rename</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onDeleteDialog}>
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default FolderDropdownMenu;
