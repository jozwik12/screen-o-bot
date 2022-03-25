import { Fragment, useState } from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ReportGmailerrorredRoundedIcon from "@mui/icons-material/ReportGmailerrorredRounded";

const Disclaimer = () => {
  const [showDisclaimer, setShowDisclaimer] = useState({
    bottom: true,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.key === "Esc") {
      return;
    }

    setShowDisclaimer({ ...showDisclaimer, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{
        width: "auto",
        fontFamily: "Roboto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: "8px",
      }}
      role="presentation"
    >
      <span style={{ textAlign: "justify"}}>
        Zawsze upewnij się, że wolno ci przechwytywać zawartość wyświetlaną na
        ekranie.
      </span>
      <span style={{ textAlign: "justify", paddingBottom: "8px" }}>
        Twórca programu nie jest odpowiedzialny za jakiekolwiek nadużycia
        wynikające z działania lub użycia programu oraz wynikające z nich
        konsekwencje.
      </span>
      <Button
        variant="contained"
        onClick={toggleDrawer(anchor, false)}
        sx={{ width: 120 }}
      >
        OK
      </Button>
    </Box>
  );

  return (
    <div>
      {["bottom"].map((anchor) => (
        <Fragment key={anchor}>
          <IconButton onClick={toggleDrawer(anchor, true)}>
            <ReportGmailerrorredRoundedIcon
              className="Disclaimer"
              color="primary"
              sx={{ fontSize: 35 }}
            />
          </IconButton>
          <SwipeableDrawer
            anchor={anchor}
            open={showDisclaimer[anchor]}
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

export default Disclaimer;
