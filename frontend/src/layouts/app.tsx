import { Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function AppLayout() {
  const auth = useAuth();

  return (
    <>
      <Outlet />
    </>
  );
}

export default AppLayout;
