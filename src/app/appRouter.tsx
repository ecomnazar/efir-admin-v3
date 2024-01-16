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
import { UserCreate } from "@/pages/user/user-create";
import { SinglePostPage } from "@/pages/post/single-post";
import { UserProfilePage } from "@/pages/user/user-profile";
import { AddPostPage } from "@/pages/post/add-post";
import { SingleChannelPage } from "@/pages/channel/single-channel/ui/page";
import { CreateChannelPage } from "@/pages/channel/create-channel";
import { AdminEditPage } from "@/pages/admin/admin-edit";
import { AdminCreatePage } from "@/pages/admin/admin-create";
import { SingleHistoryPage } from "@/pages/history/single-history";
import { AddHistoryPage } from "@/pages/history/add-history";

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
              path: "user",
              children: [
                {
                  path: 'list',
                  element: <UserPage />
                },
                {
                  path: "profile/:id",
                  element: <UserProfilePage />,
                },
                {
                  path: 'create',
                  element: <UserCreate />
                }
              ],
            },
            {
              path: "history",
              children: [
                {
                  path: 'list',
                  element: <HistoryPage />,
                },
                {
                  path: 'single/:id',
                  element: <SingleHistoryPage />,
                },
                {
                  path: 'create/:id',
                  element: <AddHistoryPage />,
                }
              ]
            },
            {
              path: "post",
              children: [
                {
                  path: "list",
                  element: <PostPage />,
                },
                {
                  path: "single/:id",
                  element: <SinglePostPage />,
                },
                {
                  path: 'create/:id',
                  element: <AddPostPage />
                }
              ]
            },
            {
              path: "/category",
              element: <CategoryPage />,
            },
            {
              path: "channel",
              children: [
                {
                  path: 'list',
                  element: <ChannelPage />
                },
                {
                  path: "single/:id",
                  element: <SingleChannelPage />
                },
                {
                  path: 'create',
                  element: <CreateChannelPage />

                }
              ]
            },
            {
              path: "admin",
              children: [
                {
                  path: 'list',
                  element: <AdminPage />
                },
                {
                  path: 'edit/:id',
                  element: <AdminEditPage />
                },
                {
                  path: 'create',
                  element: <AdminCreatePage />
                }
              ]
            },
          ],
        },
      ],
    },
  ]);
