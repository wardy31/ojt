import Login from "@/features/auth/container/Login";
import DashboardPage from "@/features/dashboard/DashboardPage";
import FolderPage from "@/features/folders/FolderPage";
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
      {
        path: "folders/:folderId",
        Component: FolderPage,
      },
    ],
  },
]);

export default router;
