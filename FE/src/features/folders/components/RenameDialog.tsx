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
          <DialogTitle className="capitalize">
            {title} {type}
          </DialogTitle>
        </DialogHeader>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="name" className="">
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
          <Button type="submit" onClick={onHandleSubmit} disabled={loading}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default RenameDialog;
