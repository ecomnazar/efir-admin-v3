import { DashboardPage } from "@/pages/dashboard";
import { LoginPage } from "@/pages/login";
import { PrivateRoutes } from "@/shared/lib";
import { createBrowserRouter } from "react-router-dom";
import { BaseLayout } from "./layouts/baseLayout";
import { CategoryPage } from "@/pages/category";
import { AdminPage } from "@/pages/admin";
import { ChannelPage } from "@/pages/channel";
import { PostPage } from "@/pages/post";
import { HistoryPage } from "@/pages/history";
import { UserPage } from "@/pages/user";

export const appRouter = () =>
  createBrowserRouter([
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      element: <PrivateRoutes />,
      children: [
        {
          element: <BaseLayout />,
          children: [
            {
              path: "/",
              element: <DashboardPage />,
            },
            {
              path: "/user",
              element: <UserPage />,
            },
            {
              path: "/history",
              element: <HistoryPage />,
            },
            {
              path: "/post",
              element: <PostPage />,
            },
            {
              path: "/category",
              element: <CategoryPage />,
            },
            {
              path: "/channel",
              element: <ChannelPage />,
            },
            {
              path: "/admin",
              element: <AdminPage />,
            },
          ],
        },
      ],
    },
  ]);
