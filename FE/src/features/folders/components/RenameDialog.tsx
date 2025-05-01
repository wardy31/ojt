import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface props {
  title?: string;
  open: boolean;
  data: {
    name?: string;
  };
  loading?: boolean;
  isDelete?: boolean;
  type: "folder" | "file" | null;
  onHandleChange?: (e: any) => void;
  onOpenChange?: (d: any) => void;
  onHandleSubmit?: () => void;
}

function RenameDialog({
  title,
  open,
  onOpenChange,
  data,
  onHandleChange,
  loading = false,
  // isDelete = false,
  onHandleSubmit,
  type,
}: props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="capitalize text-indigo-700">
            {title} {type}
          </DialogTitle>
        </DialogHeader>

        <div className="grid w-full max-w-sm items-center gap-1.5 py-3">
          <Label htmlFor="name" className="text-gray-600">
            Name
          </Label>
          <Input
            id="name"
            name="name"
            value={data.name}
            onChange={onHandleChange}
          />
        </div>
        <DialogFooter>
          <Button type="submit" onClick={onHandleSubmit} disabled={loading} className="bg-indigo-700 hover:bg-indigo-600">
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default RenameDialog;
