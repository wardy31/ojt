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

function FolderDialog({
  title,
  open,
  onOpenChange,
  data,
  onHandleChange,
  loading = false,
  isDelete = false,
  onHandleSubmit,
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {isDelete && "Are you sure to delete this file?"}
          </DialogDescription>
        </DialogHeader>

        {!isDelete && (
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
        )}
        <DialogFooter>
          <Button type="submit" onClick={onHandleSubmit} disabled={loading}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default FolderDialog;
