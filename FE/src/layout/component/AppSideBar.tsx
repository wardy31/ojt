import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Ellipsis,
  Folder,
  LayoutDashboardIcon,
  MapPinPlusInside,
  MoreHorizontal,
  Plus,
} from "lucide-react";
import axiosConfig from "../../config/axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import useDialog from "@/hooks/useDialog";
import AppDialog from "@/components/dialog/AppDialog";
import useData from "@/hooks/useData";
import AppDropdownMenu from "@/components/AppDropdownMenu";

interface DataType {
  id: number;
  name: string;
}

function AppSideBar() {
  const [fetchData, setFetchData] = useState<DataType[]>([]);
  const { data, handleDataChange, handleClear } = useData({
    name: "",
  });
  const [success, setSuccess] = useState(false);
  const [successLoading, setSuccessLoading] = useState(false);
  const [id, setId] = useState<number>();
  const [dropdown, setDropdown] = useState<boolean>(false);

  console.log("data", data);

  // Add
  const [addLoading, setAddLoading] = useState(false);
  const {
    dialog: addDialog,
    setDialog: addSetDialog,
    handleDialog: handleAddDialog,
  } = useDialog();

  const handleAddData = async () => {
    try {
      setSuccessLoading(true);
      setSuccess(false);
      const { data: dat } = await axiosConfig.post("folders", data);
      setSuccess(true);
      setSuccessLoading(false);
      handleClear();
      handleAddDialog();
      setId(0);
      console.log("dat", dat);
    } catch (error) {}
  };
  // Add

  // Edit
  const [editLoading, setEditLoading] = useState(false);
  const {
    dialog: editDialog,
    setDialog: editSetDialog,
    handleDialog: handleEditDialog,
  } = useDialog();

  const handleEditData = async () => {
    try {
      setSuccessLoading(true);
      setSuccess(false);
      const { data: dat } = await axiosConfig.put(`folders/${id}`, data);
      setSuccess(true);
      setSuccessLoading(false);
      handleClear();
      handleEditDialog();
      setId(0);
    } catch (error) {}
  };
  // Edit

  // Delete
  const [deleteLoading, setDeleteLoading] = useState(false);
  const {
    dialog: deleteDialog,
    setDialog: deleteSetDialog,
    handleDialog: handleDeleteDialog,
  } = useDialog();

  const handleDeleteData = async () => {
    try {
      setSuccessLoading(true);
      setSuccess(false);
      const { data: dat } = await axiosConfig.delete(`folders/${id}`);
      setSuccess(true);
      setSuccessLoading(false);
      handleDeleteDialog();
      setId(0);
    } catch (error) {}
  };
  // Delete

  useEffect(() => {
    (async () => {
      const { data } = await axiosConfig.get("/folders?isParent=true");
      setFetchData(data);
    })();
  }, [success]);

  if (!fetchData.length) {
    return;
  }
  console.log(id);
  return (
    <>
      {addDialog && (
        <AppDialog
          data={data}
          handleDataChange={handleDataChange}
          open={addDialog}
          onOpenChange={addSetDialog}
          handleSubmit={handleAddData}
          loading={successLoading}
          title={"Add New Folder"}
        ></AppDialog>
      )}
      {editDialog && (
        <AppDialog
          data={data}
          handleDataChange={handleDataChange}
          open={editDialog}
          onOpenChange={(open: boolean) => {
            editSetDialog(open);
            if (!open) {
              setId(0);
            }
          }}
          handleSubmit={handleEditData}
          loading={successLoading}
          title={"Edit Folder"}
        ></AppDialog>
      )}

      {deleteDialog && (
        <AppDialog
          data={data}
          isDelete={true}
          handleDataChange={handleDataChange}
          open={deleteDialog}
          onOpenChange={(open: boolean) => {
            deleteSetDialog(open);
            if (!open) {
              setId(0);
            }
          }}
          handleSubmit={handleDeleteData}
          loading={successLoading}
          title={"Delete Folder"}
        ></AppDialog>
      )}

      <Sidebar variant="inset">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigate</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem key={"Dashboard"}>
                  <SidebarMenuButton
                    asChild
                    className=" hover:bg-blue-800 hover:text-white"
                  >
                    <a href="#">
                      <LayoutDashboardIcon></LayoutDashboardIcon>
                      <span>{"Dashboard"}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Menu Folder</SidebarGroupLabel>
            <SidebarGroupAction
              title="Add Folder"
              className=" bg-blue-800 text-white hover:bg-blue-800 hover:text-white"
              onClick={() => {
                handleClear();
                handleAddDialog();
              }}
            >
              <Plus></Plus> <span className="sr-only">Add Folder</span>
            </SidebarGroupAction>
            <SidebarGroupContent>
              <SidebarMenu>
                {fetchData.map((m) => (
                  <SidebarMenuItem key={m?.id}>
                    <SidebarMenuButton
                      asChild
                      className=" hover:bg-blue-800 hover:text-white"
                    >
                      <Link to={`/folders/${m?.id}`}>
                        <Folder />
                        <span>{m?.name}</span>
                      </Link>
                    </SidebarMenuButton>

                    <AppDropdownMenu
                      open={dropdown && id === m.id}
                      onChangeId={() => setId(m.id)}
                      onOpenChange={(open: boolean) => {
                        setDropdown(open);
                        if (!open) {
                          setId(0);
                          console.log("GG");
                        }
                      }}
                      handleEditDialog={() => {
                        handleDataChange({
                          target: {
                            name: "name",
                            value: m.name,
                          },
                        });
                        handleEditDialog();
                        setDropdown(false);
                      }}
                      handleDeleteDialog={() => {
                        handleDeleteDialog();
                        setDropdown(false);
                      }}
                    ></AppDropdownMenu>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <span className="text-center">Welcome Admin!</span>
          <Button>Logout</Button>
        </SidebarFooter>
      </Sidebar>
    </>
  );
}

export default AppSideBar;
