// external
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    navigate("/login");
  }

  return <div>Dashboard</div>;
};

export default Dashboard;
