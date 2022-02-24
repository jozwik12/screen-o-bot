import VolumeOffRoundedIcon from "@mui/icons-material/VolumeOffRounded";
import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUpRounded";
import FolderRoundedIcon from "@mui/icons-material/FolderRounded";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import IconButton from "@mui/material/IconButton";
import RecorderButton from "./RecorderButton"

const App = () => {
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
      <IconButton
        variant="contained"
        component="label"
        onClick={() => {
          window.ipcRenderer.send("select-save-dir");
        }}
      >
        <FolderRoundedIcon color="primary" fontSize="large" />
      </IconButton>
    </div>
  );
};

export default App;
