import Button from "@mui/material/Button";
import { useState } from "react";

const RecorderButton = () => {
  const [recorderButtonIndex, setRecorderButtonIndex] = useState(0);
  switch (recorderButtonIndex) {
    case 0:
      return (
        <Button
          variant="contained"
          onClick={() => {
            window.ipcRenderer.send("show");
            setRecorderButtonIndex(1);
          }}
        >
          Otwórz okno nagrywania
        </Button>
      );
    case 1:
      return (
        <Button
          variant="contained"
          onClick={() => {
            window.ipcRenderer.send("runPythonScript");
            setRecorderButtonIndex(2);
          }}
        >
          Rozpocznij nagrywanie
        </Button>
      );
    case 2:
      return (
        <Button
          variant="contained"
          onClick={() => {
            window.ipcRenderer.send("hide");
            setRecorderButtonIndex(0);
          }}
        >
          Zatrzymaj nagrywanie
        </Button>
      );
  }
};

export default RecorderButton;
