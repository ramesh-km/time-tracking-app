import { AppShell } from "@mantine/core";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAuthCheck from "../../hooks/useAuthCheck";
import AppHeader from "./components/AppHeader";
import AppNavbar from "./components/AppNavBar";

function AppLayout() {
  const { user } = useAuth();
  useAuthCheck();

  return (
    <AppShell layout="alt" header={<AppHeader />} aside={<AppNavbar />}>
      {user ? <Outlet /> : null}
    </AppShell>
  );
}

export default AppLayout;
