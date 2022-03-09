import { Fragment, useState } from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Link from "@mui/material/Link";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import IconButton from "@mui/material/IconButton";

const ProjectInfo = (props) => {
  const [showProjectInfo, setShowProjectInfo] = useState({
    bottom: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.key === "Esc") {
      return;
    }

    setShowProjectInfo({ ...showProjectInfo, [anchor]: open });
  };

  const list = () => (
    <Box sx={{ width: "auto", fontFamily: "Roboto" }} role="presentation">
      Autor: Szymon Józwicki Strona Projektu:
      <Link
        href="https://github.com/jozwik12/screen-o-bot"
        target="_blank"
        rel="noopener"
        underline="hover"
      >
        GitHub
      </Link>
      Wersja programu: {props.appVersion}
    </Box>
  );

  return (
    <div>
      {["bottom"].map((anchor) => (
        <Fragment key={anchor}>
          <IconButton onClick={toggleDrawer(anchor, true)}>
            <InfoOutlinedIcon color="primary" fontSize="large" />
          </IconButton>
          <SwipeableDrawer
            anchor={anchor}
            open={showProjectInfo[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
            swipeAreaWidth={0}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </Fragment>
      ))}
    </div>
  );
};

export default ProjectInfo;
