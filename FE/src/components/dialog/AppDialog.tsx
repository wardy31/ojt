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
import { Label } from "../ui/label";
import { Input } from "../ui/input";

function AppDialog({
  open,
  onOpenChange,
  data,
  handleDataChange,
  handleSubmit,
  loading,
  title,
  isDelete = false,
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-indigo-700">{title}</DialogTitle>
          <DialogDescription>
            {isDelete && "Are you sure to delete this file?"}
          </DialogDescription>
        </DialogHeader>

        {!isDelete && (
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="name" className="text-gray-600">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              value={data.name}
              onChange={handleDataChange}
            />
          </div>
        )}
        <DialogFooter>
          <Button
            type="submit"
            onClick={handleSubmit}
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

export default AppDialog;
