import "./AnimatedSideBar.css";
import WhiteThemeProvider from "../../providers/style/WhiteThemeProvider";
import WhiteTheme from "../../../content/style/whiteTheme";
import { motion } from "framer-motion";

import {
  AccountCircleRounded,
  AssignmentTurnedInRounded,
  AttachMoneyRounded,
  BarChartRounded,
  ColorLensRounded,
  DashboardRounded,
  SettingsRemoteRounded,
  TocRounded,
} from "@mui/icons-material";
import Item from "./Components/Item";
import { useState } from "react";
import { Link } from "react-router-dom";

function AnimatedSideBar(): JSX.Element {
  const [open, setOpen] = useState<boolean>(true);

  // for collapsing sidebar
  const handleToggle = (): void => {
    setOpen(!open);
  };

  const sideContainerVariants = {
    true: {
      width: "15rem",
      marginTop: "50px",
    },
    false: {
      transition: {
        delay: 0.6,
      },
    },
  };

  const sidebarVariants = {
    true: {},
    false: {
      width: "3rem",
      transition: {
        delay: 0.4,
      },
    },
  };

  const profileVariants = {
    true: {
      alignSelf: "center",
      width: "4rem",
    },
    false: {
      alignSelf: "flex-start",
      marginTop: "2rem",
      width: "3rem",
    },
  };

  return (
    <div className="AnimatedSideBar">
      <motion.div
        data-Open={open}
        variants={sideContainerVariants}
        initial={`${open}`}
        animate={`${open}`}
        className="sidebar_container"
      >
        {/* sidebar div */}
        <motion.div
          className="sidebar"
          initial={`${open}`}
          animate={`${open}`}
          variants={sidebarVariants}
        >
          {/* lines_icon */}
          <motion.div
            whileHover={{
              scale: 1.2,
              rotate: 180,
              backgroundColor: "rgba(59, 107, 178)",
              backdropFilter: "blur(3.5px)",
              WebkitBackdropFilter: "blur(3.5px)",
              border: "1px solid rgba( 255, 255, 255, 0.18 )",
              transition: {
                delay: 0.2,
                duration: 0.4,
              },
            }}
            onClick={handleToggle}
            className="lines_icon"
          >
            <TocRounded />
          </motion.div>
          {/* profile */}
          <motion.div
            layout
            initial={`${open}`}
            animate={`${open}`}
            variants={profileVariants}
            className="profile"
            transition={{ duration: 0.4 }}
            whileHover={{
              backgroundColor: "rgba(59, 107, 178)",
              boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
              backdropFilter: "blur(5.5px)",
              WebkitBackdropFilter: "blur(5.5px)",
              border: "1px solid rgba( 255, 255, 255, 0.18 )",
              cursor: "pointer",
            }}
          >
            <img
              src="https://ae01.alicdn.com/kf/H5be6a0fa5f584a8a8420da2a7d4bc809r/RBRARE-Polaroid-Men-s-Goggle-Driving-Sunglasses-Men-Classic-Low-Profile-Sun-Glasses-For-Men-High.jpg"
              alt="profile_img"
            />
          </motion.div>
          {/* groups */}
          <div className="groups">
            {/* group 1 */}
            <div className="group">
              <motion.h3
                animate={{ opacity: open ? 1 : 0, height: open ? "auto" : 0 }}
              >
                Ideation
              </motion.h3>
              <Link to="/Notebook" style={{ textDecoration: 'none',
            color: 'black'
            }}>
                <Item icon={<DashboardRounded />} name="Idea Notebook" />
              </Link>
              <Link to="/aideator" style={{ textDecoration: 'none',
            color: 'black'
            }}>
                <Item icon={<BarChartRounded />} name="AIdeator" />
              </Link>
            </div>
          </div>
          {/* group 2 */}
          <div className="group">
            <motion.h3
              animate={{ opacity: open ? 1 : 0, height: open ? "auto" : 0 }}
            >
              Validation
            </motion.h3>
            <Link to="/deck" style={{ textDecoration: 'none',
            color: 'black'
            }}>
              <Item icon={<AttachMoneyRounded />} name="Deck" />
            </Link>
            <Link to="/backlog" style={{ textDecoration: 'none',
            color: 'black'
            }}>
              <Item icon={<AssignmentTurnedInRounded />} name="Idea Backlog" />
            </Link>
          </div>
          {/* group 3 */}
          <div className="group">
            <motion.h3
              animate={{ opacity: open ? 1 : 0, height: open ? "auto" : 0 }}
            >
              Acceleration
            </motion.h3>
            <Link to="/critiq/RunCritiQ" style={{ textDecoration: 'none',
            color: 'black'
            }}>
               <Item icon={<SettingsRemoteRounded />} name="Run CritIQ" />
            </Link>
          </div>
        </motion.div>
      </motion.div>

      <div className="body_container">
        {/* <hr />i am body
        <hr />i am body
        <hr />i am body
        <hr />i am body
        <hr />i am body
        <hr />i am body
        <hr />i am body
        <hr />i am body
        <hr />i am body
        <hr />i am body
        <hr />i am body
        <hr />i am body
        <hr />i am body
        <hr />i am body
        <hr />i am body
        <hr />i am body
        <hr />i am body
        <hr />i am body
        <hr /> */}
      </div>
    </div>
  );
}

export default AnimatedSideBar;
