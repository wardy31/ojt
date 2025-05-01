import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface props {
  title?: string;
  open: boolean;
  loading: boolean;
  isDelete?: boolean;
  onHandleChange?: () => void;
  onOpenChange: (d: any) => void;
  onHandleSubmit: () => void;
}

function DeleteDialog({
  title,
  open,
  onOpenChange,
  loading = false,
  isDelete = true,
  onHandleSubmit,
}: props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="capitalize text-indigo-700">
            {title}
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <span> {isDelete && "Are you sure to delete?"}</span>
        <DialogFooter>
          <Button
            type="submit"
            onClick={onHandleSubmit}
            disabled={loading}
            className="bg-indigo-700 hover:bg-indigo-600"
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteDialog;
