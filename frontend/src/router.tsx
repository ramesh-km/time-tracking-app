import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layouts/app";
import AuthLayout from "./layouts/auth";
import RootLayout from "./layouts/root";
import InsightsPage from "./pages/insights";
import LoginPage from "./pages/login";
import LogoutPage from "./pages/register";
import ReportPage from "./pages/reports";
import ResetPasswordPage from "./pages/reset-password";
import SettingsPage from "./pages/settings";
import TagsPage from "./pages/tags";
import Component from "./pages/timer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: "/login",
            element: <LoginPage />,
          },
          {
            path: "/register",
            element: <LogoutPage />,
          },
          {
            path: "/reset-password",
            element: <ResetPasswordPage />,
          },
        ],
      },
      {
        element: <AppLayout />,
        children: [
          {
            path: "/",
            lazy: () => import("./pages/timer"),
          },
          {
            path: "/reports",
            lazy: () => import("./pages/reports"),
          },
          {
            path: "/insights",
            lazy: () => import("./pages/insights"),
          },
          {
            path: "/tags",
            lazy: () => import("./pages/tags"),
          },
          {
            path: "/settings",
            lazy: () => import("./pages/settings"),
          },
        ],
      },
    ],
  },
]);

export default router;
