import { MantineProvider } from "@mantine/core";
import { QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import queryClient from "../lib/query-client";
import theme from "../theme";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Notifications } from "@mantine/notifications";
import AuthProvider from "../contexts/AuthProvider";
import { NavigationProgress } from "@mantine/nprogress";

function RootLayout() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Outlet />
          <Notifications />
          <ReactQueryDevtools position="bottom-right" />
        </AuthProvider>
      </QueryClientProvider>
      <NavigationProgress />
    </MantineProvider>
  );
}

export default RootLayout;
