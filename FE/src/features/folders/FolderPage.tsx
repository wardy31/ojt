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
import {
  ChevronLeft,
  EllipsisVertical,
  FileIcon,
  FolderIcon,
  HandMetal,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import moment from "moment";
import useData from "@/hooks/useData";
import useDialog from "@/hooks/useDialog";
import FolderDialog from "./components/FolderDialog";
import FileDialog from "./components/FileDialog";
import { format } from "path";

type FileOrFolder = {
  id: number;
  name: string;
  type: "file" | "folder";
  createdAt: any;
};

function FolderPage() {
  const navigate = useNavigate();
  const { folderId } = useParams();
  const { data, handleDataChange, handleClear } = useData({
    name: "",
  });
  const [file, setFile] = useState();
  const [suc, setSuc] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClickNavigate = (id: number, type: "folder" | "file") => {
    if (type === "folder") {
      navigate(`/folders/${id}`);
    }
    if (type === "file") {
      alert(id);
    }
  };

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

  useEffect(() => {
    (async () => {
      setGetLoading(true);
      const { data } = await axios.get(`folders/${folderId}/files-folders`);
      await setGetData(data?.combineData);
      await setTitle(data?.name);
      setGetLoading(false);
    })();
  }, [folderId, loading]);

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

      <div className="flex   items-center justify-between my-6">
        <div className="flex gap-2 items-center">
          {" "}
          <Button size={"icon"} onClick={() => navigate(-1)}>
            <ChevronLeft></ChevronLeft>
          </Button>
          <h2 className="uppercase text-2xl">{title}</h2>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleAddDialog}>
            <FolderIcon></FolderIcon>
            Add Folder
          </Button>
          <Button onClick={handleAddFileDialog}>
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
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {getData.map((m) => (
            <TableRow
              key={m.id}
              onClick={() => handleClickNavigate(m.id, m.type)}
              className="cursor-pointer"
            >
              <TableCell className="flex items-center gap-2 pt-3">
                {m.type === "folder" && <FolderIcon></FolderIcon>}
                {m.type === "file" && <FileIcon></FileIcon>}
                {m.name}
              </TableCell>
              {/* <TableCell className="capitalize">{m.type}</TableCell> */}
              <TableCell className="text-center">
                {moment(m.createdAt).format("MMMM DD, YYYY")}
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <EllipsisVertical></EllipsisVertical>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default FolderPage;
