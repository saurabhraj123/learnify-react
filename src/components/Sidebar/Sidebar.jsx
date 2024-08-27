// external
import { useAuth0 } from "@auth0/auth0-react";

// icons
import { MdDashboard } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";

// components
import { IconWithTooltip } from "../../components";

// css
import classNames from "classnames";
import classes from "./Sidebar.module.css";

const ICON_FILL = "rgb(99, 129, 243)";

const Sidebar = () => {
  const { logout } = useAuth0();

  const iconProps = {
    size: 26,
    color: ICON_FILL,
    className: classes.icon,
  };

  const topSectionButtons = [
    {
      icon: <MdDashboard {...iconProps} />,
      href: "/dashboard",
      tooltipText: "Dashboard",
    },
  ];

  const bottomSectionButtons = [
    {
      icon: (
        <FiLogOut
          {...iconProps}
          className={classNames(classes.icon, classes.logoutIcon)}
        />
      ),
      wrapInLink: false,
      tooltipText: "Logout",
      onClick: logout,
    },
  ];

  return (
    <div className={classes.container}>
      <div className={classes.topSection}>
        {topSectionButtons.map((data) => {
          return <IconWithTooltip key={data.href} {...data} />;
        })}
      </div>

      <div className={classes.bottomSection}>
        {bottomSectionButtons.map((data) => {
          return <IconWithTooltip key={data.tooltipText} {...data} />;
        })}
      </div>
    </div>
  );
};

export default Sidebar;
