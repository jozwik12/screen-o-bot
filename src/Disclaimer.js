import { Fragment, useState } from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ReportGmailerrorredRoundedIcon from '@mui/icons-material/ReportGmailerrorredRounded';

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
    <Box sx={{ width: "auto", fontFamily: "Roboto" }} role="presentation">
      Always make sure that you are allowed to take the screenshot of your
      screen content. Creator of this program is not responsible in any way for
      its use or misuse.
      <Button variant="contained" onClick={toggleDrawer(anchor, false)}>
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
