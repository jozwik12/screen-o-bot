import Button from "@mui/material/Button";
import LaunchIcon from "@mui/icons-material/Launch";
import CircleIcon from "@mui/icons-material/Circle";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import { useState } from "react";

const buttonStyle = {
  display: "flex",
  alignItems: "center",
  fontWeight: "bold",
  fontSize: 14,
  width: 330,
  border: 2,
  lineHeight: 3,
};

const iconStyle = {
  fontSize: 24,
};

const RecorderButton = () => {
  const [recorderButtonIndex, setRecorderButtonIndex] = useState(0);
  switch (recorderButtonIndex) {
    case 0:
      return (
        <Button
          className="RecorderButton"
          sx={buttonStyle}
          variant="contained"
          endIcon={<LaunchIcon style={iconStyle} />}
          onClick={() => {
            window.ipcRenderer.send("show");
            setRecorderButtonIndex(1);
          }}
        >
          Otwórz okno przechwytywania
        </Button>
      );
    case 1:
      return (
        <Button
          className="RecorderButton"
          sx={buttonStyle}
          variant="contained"
          endIcon={<CircleIcon style={iconStyle} />}
          onClick={() => {
            window.ipcRenderer.send("runPythonScript");
            setRecorderButtonIndex(2);
          }}
        >
          Rozpocznij przechwytywanie
        </Button>
      );
    case 2:
      return (
        <Button
          className="RecorderButton"
          sx={buttonStyle}
          variant="contained"
          endIcon={<StopCircleIcon style={iconStyle} />}
          onClick={() => {
            window.ipcRenderer.send("hide");
            setRecorderButtonIndex(0);
          }}
        >
          Zatrzymaj przechwytywanie
        </Button>
      );
  }
};

export default RecorderButton;
