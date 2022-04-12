import { Fragment, useState } from "react";
import Grid from "@mui/material/Grid";
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
    <Grid
      container
      spacing={1.5}
      sx={{
        fontFamily: "Roboto",
        display: "flex",
        alignContent: "center",
        p: "8px",
      }}
    >
      <Grid item xs={12}>
        Program do przechwytywania zawartości pulpitu poprzez tworzenie
        screenshotów w momencie , w którym wykryta zostanie zmiana zawartości
        ekranu.
      </Grid>
      <Grid item xs={6}>
        Autor: Szymon Józwicki
      </Grid>
      <Grid item xs={6}>
        Wersja programu: {props.appVersion}
      </Grid>
      <Grid item xs={6}>
        Strona Projektu: {" "}
        <Link
          href="https://github.com/jozwik12/screen-o-bot"
          target="_blank"
          rel="noopener"
          underline="hover"
        >
          GitHub
        </Link>
      </Grid>
      <Grid item xs={6}>
        Wersja Electron: 16.0.0
      </Grid>
      <Grid item xs={12}>
        Program rozpowszechniany pod licencją GNU GLP v3.0
      </Grid>
      <Grid item xs={12}>
        Copyright © 2022 Szymon Józwicki
      </Grid>
    </Grid>
  );

  return (
    <div>
      {["bottom"].map((anchor) => (
        <Fragment key={anchor}>
          <IconButton onClick={toggleDrawer(anchor, true)}>
            <InfoOutlinedIcon
              className="ProjectInfo"
              color="primary"
              fontSize="large"
            />
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
