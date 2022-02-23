import Button from "@mui/material/Button";
import VolumeOffRoundedIcon from "@mui/icons-material/VolumeOffRounded";
import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUpRounded";
import FolderRoundedIcon from "@mui/icons-material/FolderRounded";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import IconButton from "@mui/material/IconButton";

const App = () => {
  return (
    <div>
      <Button
        variant="contained"
        onClick={() => {
          window.ipcRenderer.send("show");
        }}
      >
        Otwórz okno nagrywania
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          window.ipcRenderer.send("runPythonScript");
        }}
      >
        Rozpocznij nagrywanie
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          window.ipcRenderer.send("hide");
        }}
      >
        Zatrzymaj nagrywanie
      </Button>

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
          window.ipcRenderer.send("select-dirs");
        }}
      >
        <FolderRoundedIcon color="primary" fontSize="large" />
      </IconButton>
    </div>
  );
};

export default App;
