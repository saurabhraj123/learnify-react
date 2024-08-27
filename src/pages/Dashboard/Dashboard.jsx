// components
import { Sidebar } from "../../components";

// external
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

// css
import classes from "./Dashboard.module.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    navigate("/login");
  }

  return (
    <div className={classes.container}>
      <Sidebar />
    </div>
  );
};

export default Dashboard;
