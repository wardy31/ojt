import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
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
import { Link, useLocation, useNavigate } from "react-router";
import useDialog from "@/hooks/useDialog";
import AppDialog from "@/components/dialog/AppDialog";
import useData from "@/hooks/useData";
import AppDropdownMenu from "@/components/AppDropdownMenu";
import logo from "../../assets/logo.png";

interface DataType {
  id: number;
  name: string;
}

function AppSideBar() {
  const navigate = useNavigate();
  const location = useLocation();
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
      navigate("/folders");
    } catch (error) {}
  };
  // Delete

  useEffect(() => {
    (async () => {
      const { data } = await axiosConfig.get("/folders?isParent=true");
      setFetchData(data);
    })();
  }, [success]);

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

      <Sidebar variant="inset" className="bg-indigo-700">
        <SidebarHeader className="bg-indigo-700">
          <div className="flex items-center justify-baseline">
            <img src={logo} alt="" className="w-20 h-20" />
            <span className="text-white font-bold text-2xl">VPAS</span>
          </div>
        </SidebarHeader>
        <SidebarContent className="bg-indigo-700">
          <SidebarGroup>
            <SidebarGroupLabel className="text-white">
              Navigate
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem key={"Dashboard"}>
                  <SidebarMenuButton
                    asChild
                    className={`text-white hover:bg-white hover:text-black ${
                      location.pathname == "/dashboard"
                        ? "bg-white text-black"
                        : ""
                    }`}
                  >
                    <Link to={`/dashboard`}>
                      <LayoutDashboardIcon></LayoutDashboardIcon>
                      <span>{"Dashboard"}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel className="text-white">
              Menu Folder
            </SidebarGroupLabel>
            <SidebarGroupAction
              title="Add Folder"
              className=" bg-primary rounded-sm text-white hover:bg-blue-800 hover:text-white"
              onClick={() => {
                handleClear();
                handleAddDialog();
              }}
            >
              <Plus className="text-white"></Plus>{" "}
              <span className="sr-only">Add Folder</span>
            </SidebarGroupAction>
            <SidebarGroupContent>
              <SidebarMenu>
                {fetchData.map((m) => (
                  <SidebarMenuItem key={m?.id}>
                    <SidebarMenuButton
                      asChild
                      className={`text-white hover:bg-white hover:text-black ${
                        location.pathname == `/folders/${m.id}`
                          ? "bg-white text-black"
                          : ""
                      } `}
                    >
                      <Link to={`/folders/${m?.id}`}>
                        <Folder />
                        <span>{m?.name}</span>
                      </Link>
                    </SidebarMenuButton>

                    <AppDropdownMenu
                      isPath={location.pathname == `/folders/${m.id}`}
                      open={dropdown && id === m.id}
                      onChangeId={() => setId(m.id)}
                      onOpenChange={(open: boolean) => {
                        setDropdown(open);
                        if (!open) {
                          setId(0);
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
        <SidebarFooter className="bg-indigo-700 ">
          <span className="text-center text-white">Welcome Admin!</span>
          <Button
            className="bg-white text-indigo-700 hover:bg-indigo-50 "
            onClick={() => {
              navigate("/login");
            }}
          >
            Logout
          </Button>
        </SidebarFooter>
      </Sidebar>
    </>
  );
}

export default AppSideBar;
