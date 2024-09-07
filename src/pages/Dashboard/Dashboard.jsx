// external
import _ from "lodash";
import PropsTypes from "prop-types";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

// hooks
import {
  useTopLoadingBar,
  useRedirectToLoginIfNotAuthenticated,
} from "../../hooks";

// utils
import { apiClient } from "/src/utils/axios";

// components
import { Sidebar, Card } from "../../components";

// css
import classes from "./Dashboard.module.css";

const Dashboard = (props) => {
  const { setTopBarProgress } = props;
  const [courses, setCourses] = useState([]);

  const { isAuthenticated, user } = useAuth0();

  useEffect(() => {
    const fetchData = async () => {
      if (isAuthenticated && user) {
        const { data } = await apiClient.get("/api/courses", {
          headers: {
            user_email: user.email,
          },
        });
        setCourses(data);
        console.log(data);
      }
    };

    fetchData();
  }, [isAuthenticated, user]);

  // redirect to login if un-authenticated
  useRedirectToLoginIfNotAuthenticated();

  // to show the top loading bar
  useTopLoadingBar({ setTopBarProgress });

  return (
    <div className={classes.container}>
      <Sidebar />
      <div className={classes.mainSection}>
        <div className={classes.header}>Dashboard</div>
        <div className={classes.coursesContainer}>
          {_.map(courses, (course) => (
            <Card
              title={course.title}
              icon="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  setTopBarProgress: PropsTypes.func.isRequired,
};

export default Dashboard;
