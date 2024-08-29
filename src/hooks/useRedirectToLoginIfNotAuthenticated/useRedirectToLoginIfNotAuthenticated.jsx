// external
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const useRedirectToLoginIfNotAuthenticated = () => {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated } = useAuth0();

  if (!isAuthenticated && !isLoading) {
    navigate("/login");
  }
};

export default useRedirectToLoginIfNotAuthenticated;
