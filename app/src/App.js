import VolumeOffRoundedIcon from "@mui/icons-material/VolumeOffRounded";
import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUpRounded";
import FolderRoundedIcon from "@mui/icons-material/FolderRounded";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import IconButton from "@mui/material/IconButton";
import RecorderButton from "./RecorderButton";
import MonitorWarning from "./MonitorWarning";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";

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
        <VolumeOffRoundedIcon color="primary" fontSize="large" />
      </IconButton>
      <IconButton>
        <VolumeUpRoundedIcon color="primary" fontSize="large" />
      </IconButton>
      <IconButton>
        <HelpOutlineRoundedIcon color="primary" fontSize="large" />
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
    </div>
  );
};

export default App;
