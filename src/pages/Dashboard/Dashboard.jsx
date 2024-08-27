// external
import PropsTypes from "prop-types";

// hooks
import {
  useTopLoadingBar,
  useRedirectToLoginIfNotAuthenticated,
} from "../../hooks";

// components
import { Sidebar } from "../../components";

// css
import classes from "./Dashboard.module.css";

const Dashboard = (props) => {
  const { setTopBarProgress } = props;

  // redirect to login if un-authenticated
  useRedirectToLoginIfNotAuthenticated();

  // to show the top loading bar
  useTopLoadingBar({ setTopBarProgress });

  return (
    <div className={classes.container}>
      <Sidebar />
    </div>
  );
};

Dashboard.propTypes = {
  setTopBarProgress: PropsTypes.func.isRequired,
};

export default Dashboard;
