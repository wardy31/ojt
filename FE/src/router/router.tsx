import AccountPage from "@/features/account/AccountPage";
import Login from "@/features/auth/container/Login";
import DashboardPage from "@/features/dashboard/DashboardPage";
import FIleViewer from "@/features/folders/components/FIleViewer";
import FolderPage from "@/features/folders/FolderPage";
import EmptyPage from "@/layout/component/EmptyPage";
import ProtectedLayout from "@/layout/ProtectedLayout";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/",
    Component: ProtectedLayout,
    children: [
      {
        path: "dashboard",
        Component: DashboardPage,
      },
      // {
      //   path: "account",
      //   Component: AccountPage,
      // },
      {
        path: "folders/",
        Component: EmptyPage,
      },
      {
        path: "folders/:folderId",
        Component: FolderPage,
      },

      // {
      //   path: "folders/:folderId/file-viewer",
      //   Component: FIleViewer,
      // },
    ],
  },
]);

export default router;
