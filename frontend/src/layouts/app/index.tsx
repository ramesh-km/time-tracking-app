import { AppShell } from "@mantine/core";
import { Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import AppHeader from "./components/AppHeader";
import AppNavbar from "./components/AppNavBar";

function AppLayout() {
  const auth = useAuth();

  return (
    <AppShell layout="alt" header={<AppHeader />} aside={<AppNavbar />}>
      <Outlet />
    </AppShell>
  );
}

export default AppLayout;
