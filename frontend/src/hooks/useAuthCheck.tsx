import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

// This hook is used to check if the user is logged in or not and redirect to the login page if not.
function useAuthCheck() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const publicRoutes = ["/login", "/register"];

    if (user && publicRoutes.includes(location.pathname)) {
      navigate("/");
    } else if (!user && !publicRoutes.includes(location.pathname)) {
      navigate("/login");
    }
    
  }, [user]);
}

export default useAuthCheck;
