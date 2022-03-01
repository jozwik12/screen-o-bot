import { Fragment, useState } from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";

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
    <Box sx={{ width: "auto" }} role="presentation">
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
          <Button onClick={toggleDrawer(anchor, true)}>Zastrzeżenie</Button>
          <SwipeableDrawer
            anchor={anchor}
            open={showDisclaimer[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </Fragment>
      ))}
    </div>
  );
};

export default Disclaimer;
