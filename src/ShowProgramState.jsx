import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import RecordingIcon from "./RecordingIcon";
import { useContext } from "react";
import { ProgramStateContext } from "./App";
import LinearProgress from "@mui/material/LinearProgress";

const ProgramState = (props) => {
  const { programState, showLoading, setShowLoading } =
    useContext(ProgramStateContext);
  const componentStyle = { pb: "16px", width: 448, height: 70, userSelect: "none" };

  if (showLoading) {
    setTimeout(() => setShowLoading(false), 1200);
    return (
      <Alert severity="info" sx={componentStyle} variant="outlined">
        <AlertTitle>Ładowanie...</AlertTitle>
        <LinearProgress
          sx={{ height: 5, borderRadius: 2.5, width: 400, marginTop: "12px" }}
        />
      </Alert>
    );
  } else if (programState === 2) {
    return (
      <Alert
        iconMapping={{ info: <RecordingIcon /> }}
        severity="info"
        sx={componentStyle}
      >
        <AlertTitle>Nagrywanie trwa...</AlertTitle>
        Możesz bezpiecznie zminimalizować okno programu
      </Alert>
    );
  } else if (props.monitorAmount > 1)
    return (
      <Alert severity="warning" sx={componentStyle}>
        <AlertTitle>Wykryto więcej niż jeden monitor</AlertTitle>
        Wykonywanie screenshotów jest możliwe wyłącznie
        <div>
          na <strong>monitorze głównym</strong>
        </div>
      </Alert>
    );
  else
    return (
      <Alert severity="success" sx={componentStyle}>
        <AlertTitle>Program jest gotowy do działania</AlertTitle>
        Miłego użytkowania!
      </Alert>
    );
};

export default ProgramState;
