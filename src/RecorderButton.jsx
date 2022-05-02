import Button from "@mui/material/Button";
import LaunchIcon from "@mui/icons-material/Launch";
import CircleIcon from "@mui/icons-material/Circle";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import { useContext } from "react";
import { useTour } from "@reactour/tour";
import { ProgramStateContext } from "./App";

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

const RecorderButton = (props) => {
  const { programState, setProgramState, showLoading, setShowLoading } =
    useContext(ProgramStateContext);
  const { setCurrentStep } = useTour();

  switch (programState) {
    case 0:
      return (
        <Button
          className="RecorderButton"
          sx={buttonStyle}
          variant="contained"
          disabled={showLoading}
          endIcon={<LaunchIcon style={iconStyle} />}
          onClick={() => {
            window.ipcRenderer.send("show");
            setProgramState(1);
            setCurrentStep(2);
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
          disabled={showLoading}
          endIcon={<CircleIcon style={iconStyle} />}
          onClick={() => {
            window.ipcRenderer.send("runPythonScript");
            setProgramState(2);
            setCurrentStep(3);
            setShowLoading(true);
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
          disabled={showLoading}
          endIcon={<StopCircleIcon style={iconStyle} />}
          onClick={() => {
            window.ipcRenderer.send("hide");
            setProgramState(0);
            setCurrentStep(4);
            setShowLoading(true);
          }}
        >
          Zatrzymaj przechwytywanie
        </Button>
      );
  }
};

export default RecorderButton;
