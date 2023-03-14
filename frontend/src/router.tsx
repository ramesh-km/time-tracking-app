import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "./layouts/auth";
import RootLayout from "./layouts/root";
import LoginPage from "./pages/login";
import LogoutPage from "./pages/register";
import ResetPasswordPage from "./pages/reset-password";

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
    ],
  },
]);

export default router;
