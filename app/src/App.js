import VolumeOffRoundedIcon from "@mui/icons-material/VolumeOffRounded";
import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUpRounded";
import FolderRoundedIcon from "@mui/icons-material/FolderRounded";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import IconButton from "@mui/material/IconButton";
import RecorderButton from "./RecorderButton";
import TextField from "@mui/material/TextField";
import { useState } from "react";

const App = () => {
  let [savePath, setSavePath] = useState("");

  const getDefaultSavePath = async () => {
    setSavePath(await window.ipcRenderer.invoke("get-home-dir"));
  };

  const getSavePathFromMainProcess = async () => {
    setSavePath(await window.ipcRenderer.invoke("select-save-dir"));
  };

  getDefaultSavePath();

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
    </div>
  );
};

export default App;
