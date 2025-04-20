import { FileSearch } from "lucide-react";

function EmptyPage() {
  return (
    <div className="flex items-center justify-center text-center h-200">
      <div className="flex flex-col justify-center items-center">
        <FileSearch className="bg-background w-30 h-30 pb-4"></FileSearch>
        <h1 className="text-2xl font-semibold">Select Folder</h1>
      </div>
    </div>
  );
}

export default EmptyPage;
