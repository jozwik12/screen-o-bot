import FolderRoundedIcon from "@mui/icons-material/FolderRounded";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import IconButton from "@mui/material/IconButton";
import RecorderButton from "./RecorderButton";
import MonitorWarning from "./MonitorWarning";
import Disclaimer from "./Disclaimer";
import TextField from "@mui/material/TextField";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { useEffect, useState } from "react";
import ProjectInfo from "./ProjectInfo";
import { Grid } from "@mui/material";

const App = () => {
  let [savePath, setSavePath] = useState("");
  let [monitorAmount, setMonitorAmount] = useState(0);

  const getDefaultSavePath = async () => {
    setSavePath(await window.ipcRenderer.invoke("get-default-save-path"));
  };

  const getSavePathFromMainProcess = async () => {
    const newPath = await window.ipcRenderer.invoke("select-save-dir");
    if (newPath) {
      setSavePath(newPath);
    }
  };

  const getMonitorAmount = async () => {
    setMonitorAmount(await window.ipcRenderer.invoke("monitor-amount"));
  };

  useEffect(() => {
    getDefaultSavePath();
    getMonitorAmount();
  }, []);

  return (
    <Grid
      container
      sx={{
        display: "flex",
        alignContent: "center",
        justifyContent: "flex-start",
        width: 500,
        p: "2px",
        gap: "8px",
      }}
    >
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          flexDirection: "row",
          p: "0px",
        }}
      >
        <RecorderButton />
        <IconButton>
          <HelpOutlineIcon color="primary" fontSize="large" />
        </IconButton>
        <ProjectInfo />
      </Grid>
      <Grid
        item
        sx={{ display: "flex", flexDirection: "row", alignContent: "flex-end" }}
      >
        <TextField
          id="filled-hidden-label-small"
          size="small"
          value={savePath}
          disabled
          helperText="Folder zapisu"
          sx={{ width: 400 }}
        ></TextField>
        <IconButton
          variant="contained"
          component="label"
          onClick={getSavePathFromMainProcess}
          sx={{ display: "flex", alignContent: "flex-end" }}
        >
          <FolderRoundedIcon color="primary" fontSize="large" sx={{ p: 1 }} />
        </IconButton>
      </Grid>
      <Grid item>
        <MonitorWarning monitorAmount={monitorAmount}></MonitorWarning>
      </Grid>
      <Grid item>
        <Disclaimer />
      </Grid>
    </Grid>
  );
};

export default App;
