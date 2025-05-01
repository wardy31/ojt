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
import React from "react";

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
  const handleKeyEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onHandleSubmit();
    }
  };
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
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="name" className="text-gray-600">
              Name
            </Label>
            <Input
              required
              id="name"
              name="name"
              value={data.name}
              onChange={onHandleChange}
              onKeyDown={handleKeyEnter}
            />
          </div>
        )}
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

export default FolderDialog;
