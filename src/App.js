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
    <div>
      <RecorderButton />
      <IconButton>
        <HelpOutlineIcon color="primary" fontSize="large" />
      </IconButton>
      <TextField
        id="filled-hidden-label-small"
        size="small"
        value={savePath}
        disabled
        fullWidth
        helperText="Folder zapisu"
      ></TextField>
      <IconButton
        variant="contained"
        component="label"
        onClick={getSavePathFromMainProcess}
      >
        <FolderRoundedIcon color="primary" fontSize="large" />
      </IconButton>
      <MonitorWarning monitorAmount={monitorAmount}></MonitorWarning>
      <Disclaimer />
      <ProjectInfo />
    </div>
  );
};

export default App;
