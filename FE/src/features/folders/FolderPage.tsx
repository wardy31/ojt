import { useNavigate, useParams } from "react-router";
import axios from "../../config/axios";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronLeft, FileIcon, FolderIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import moment from "moment";
import useData from "@/hooks/useData";
import useDialog from "@/hooks/useDialog";
import FolderDialog from "./components/FolderDialog";
import FileDialog from "./components/FileDialog";
import FolderDropdownMenu from "./components/FolderDropdownMenu";
import RenameDialog from "./components/RenameDialog";
import DeleteDialog from "./components/DeleteDialog";

type FileOrFolder = {
  id: number;
  name: string;
  ext?: string;
  type: "file" | "folder";
  path?: "string";
  createdAt: any;
};

function FolderPage() {
  const navigate = useNavigate();
  const { folderId } = useParams();
  const { data, handleDataChange, handleClear } = useData({
    name: "",
  });

  const [type, setType] = useState<"file" | "folder" | null>(null);
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);
  // ID
  const [id, setId] = useState<number | null>();

  const handleClickNavigate = (
    id: number,
    type: "folder" | "file",
    path?: any
  ) => {
    if (type === "folder") {
      navigate(`/folders/${id}`);
    }
    if (type === "file") {
      const cleanedPath = path.replace(/^src\/uploads\//, "");
      window.open(`http://localhost:3000/api/uploads/${cleanedPath}`, "_blank");
    }
    console.log("Shessh");
  };

  // Dropdown
  const [dropdown, setDropdown] = useState(false);

  //   Fetch
  const [getData, setGetData] = useState<FileOrFolder[]>([]);
  const [title, setTitle] = useState("");
  const [getLoading, setGetLoading] = useState(true);

  // Add Folder
  const {
    dialog: addFolderDialog,
    setDialog: setAddFolderDailog,
    handleDialog: handleAddDialog,
  } = useDialog();

  const handleAddSubmit = async () => {
    try {
      setLoading(true);
      const { data: reqData } = await axios.post("/folders", {
        ...data,
        folderId,
      });
      setLoading(false);
      handleAddDialog();
      handleClear();
      console.log("reqData", reqData);
    } catch (error) {
      setLoading(false);
      alert(error);
    }
  };

  // Add File
  const {
    dialog: addFileDialog,
    setDialog: setAddFileDailog,
    handleDialog: handleAddFileDialog,
  } = useDialog();

  const handleAddFileSubmit = async () => {
    const formData = new FormData();
    formData.append("name", data.name ?? "");
    formData.append("folderId", folderId ?? "");
    formData.append("file", file ?? "");

    try {
      setLoading(true);
      const { data: reqData } = await axios.post("/files", formData);
      setLoading(false);
      handleAddFileDialog();
      handleClear();
      console.log(reqData);
    } catch (error) {
      setLoading(false);
      alert(error);
    }
  };

  //Dialogs
  const { dialog: renameDialog, handleDialog: handleRenameDialog } =
    useDialog();
  const { dialog: deleteDialog, handleDialog: handleDeleteDialog } =
    useDialog();

  // Rename
  const [renameSuc, setRenameSuc] = useState<boolean>(false);
  const [renameLoading, setRenameLoading] = useState<boolean>(false);

  const handleRenameSubmit = async () => {
    try {
      setRenameLoading(true);
      console.log(type);

      switch (type) {
        case "file":
          const { data: fileData } = await axios.put(`files/${id}`, {
            ...data,
          });
          handleRenameDialog();
          handleClear();
          setRenameLoading(false);
          break;
        case "folder":
          const { data: folderData } = await axios.put(`folders/${id}`, {
            ...data,
          });
          handleRenameDialog();
          handleClear();
          setRenameLoading(false);
          break;
        default:
          break;
      }
    } catch (error) {}
  };

  // Delete
  const [deleteSuc, setDeleteSuc] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  const handleDeleteSubmit = async () => {
    try {
      setDeleteLoading(true);
      console.log(type);

      switch (type) {
        case "file":
          const { data: fileData } = await axios.delete(`files/${id}`);
          handleDeleteDialog();
          handleClear();
          setDeleteLoading(false);
          break;
        case "folder":
          const { data: folderData } = await axios.delete(`folders/${id}`);
          handleDeleteDialog();
          handleClear();
          setDeleteLoading(false);
          break;
        default:
          break;
      }
    } catch (error) {}
  };

  useEffect(() => {
    (async () => {
      setGetLoading(true);
      const { data } = await axios.get(`folders/${folderId}/files-folders`);
      await setGetData(data?.combineData);
      await setTitle(data?.name);
      setGetLoading(false);
    })();
  }, [folderId, loading, renameLoading == false, deleteLoading == false]);

  return (
    <>
      <FolderDialog
        title={"Add New Folder"}
        open={addFolderDialog}
        onOpenChange={setAddFolderDailog}
        onHandleChange={handleDataChange}
        data={data}
        loading={loading}
        onHandleSubmit={handleAddSubmit}
      ></FolderDialog>

      <FileDialog
        title={"Add New File"}
        open={addFileDialog}
        onOpenChange={setAddFileDailog}
        onHandleChange={handleDataChange}
        data={data}
        loading={loading}
        onHandleSubmit={handleAddFileSubmit}
        file={file}
        onChangeFile={(e: any) => {
          setFile(e.target.files[0]);
        }}
      ></FileDialog>

      <RenameDialog
        title="Rename"
        open={renameDialog}
        onOpenChange={(isOpen) => {
          handleRenameDialog();
          handleClear();
          if (!isOpen) setId(null);
        }}
        type={type}
        data={data}
        loading={renameLoading}
        onHandleSubmit={handleRenameSubmit}
        onHandleChange={handleDataChange}
      ></RenameDialog>

      <DeleteDialog
        open={deleteDialog}
        onOpenChange={(isOpen) => {
          handleDeleteDialog();
          handleClear();
          if (!isOpen) setId(null);
        }}
        loading={deleteLoading}
        onHandleSubmit={handleDeleteSubmit}
      ></DeleteDialog>

      <div className="flex   items-center justify-between my-6">
        <div className="flex gap-2 items-center">
          {" "}
          <Button
            size={"icon"}
            onClick={() => navigate(-1)}
            className="bg-indigo-700 hover:bg-indigo-600"
          >
            <ChevronLeft></ChevronLeft>
          </Button>
          <h2 className="uppercase text-2xl font-semibold text-gray-700">
            {title}
          </h2>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={handleAddDialog}
            className="bg-indigo-700 hover:bg-indigo-600"
          >
            <FolderIcon></FolderIcon>
            Add Folder
          </Button>
          <Button
            onClick={handleAddFileDialog}
            className="bg-indigo-700 hover:bg-indigo-600"
          >
            <FileIcon></FileIcon>
            Add File
          </Button>
        </div>
      </div>

      <Table className="">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            {/* <TableHead>Type</TableHead> */}
            <TableHead className="text-center">Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {getData.map((m) => (
            <TableRow
              key={m.id}
              onClick={() => handleClickNavigate(m.id, m.type, m.path)}
              className="cursor-pointer"
            >
              <TableCell className="flex items-center gap-2 pt-3  font-bold tracking-wider ">
                {m.type === "folder" && (
                  <FolderIcon className="text-indigo-700"></FolderIcon>
                )}
                {m.type === "file" && (
                  <FileIcon className="text-indigo-700"></FileIcon>
                )}
                {`${m.name}${m.type === "file" ? m.ext : ""}`}
              </TableCell>
              {/* <TableCell className="capitalize">{m.type}</TableCell> */}
              <TableCell className="text-center">
                {moment(m.createdAt).format("MMMM DD, YYYY")}
              </TableCell>

              <TableCell className="text-right">
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <FolderDropdownMenu
                    open={dropdown && type === m.type && id === m.id}
                    onOpenChange={(isOpen) => {
                      setId(isOpen ? m.id : null);
                      setDropdown(isOpen ? true : false);
                      setType(isOpen ? m.type : null);
                    }}
                    onDeleteDialog={() => {
                      setType(m.type);
                      handleDeleteDialog();
                      setDropdown(false);
                    }}
                    onRenameDialog={() => {
                      setType(m.type);
                      handleDataChange({
                        target: {
                          value: m.name,
                          name: "name",
                        },
                      });
                      handleRenameDialog();
                      setDropdown(false);
                    }}
                  ></FolderDropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default FolderPage;
