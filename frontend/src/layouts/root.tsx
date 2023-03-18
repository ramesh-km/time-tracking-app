import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import queryClient from "../lib/query-client";
import theme from "../theme";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Notifications } from "@mantine/notifications";
import AuthProvider from "../contexts/AuthProvider";
import { NavigationProgress } from "@mantine/nprogress";
import OfflineAlert from "../components/OfflineAlert";
import { useState } from "react";

function RootLayout() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ ...theme, colorScheme }}
      >
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <OfflineAlert />
            <Outlet />
            <Notifications position="top-right" />
            <ReactQueryDevtools position="bottom-right" />
          </AuthProvider>
        </QueryClientProvider>
        <NavigationProgress />
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default RootLayout;
