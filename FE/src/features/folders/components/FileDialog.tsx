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

function FileDialog({
  title,
  open,
  onOpenChange,
  data,
  onHandleChange,
  loading = false,
  isDelete = false,
  onHandleSubmit,
  file,
  onChangeFile,
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className=" text-indigo-700">{title}</DialogTitle>
          <DialogDescription>
            {isDelete && "Are you sure to delete this file?"}
          </DialogDescription>
        </DialogHeader>

        {!isDelete && (
          <>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="name" className="text-gray-600">
                File Name
              </Label>
              <Input
                id="name"
                name="name"
                value={data.name}
                onChange={onHandleChange}
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="file" className="text-gray-600">
                Upload File
              </Label>
              <Input
                id="file"
                type="file"
                name="file"
                // value={file}
                onChange={onChangeFile}
              />
            </div>
          </>
        )}
        <DialogFooter>
          <Button type="submit" onClick={onHandleSubmit} disabled={loading} className="bg-indigo-700 hover:bg-indigo-600">
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default FileDialog;
