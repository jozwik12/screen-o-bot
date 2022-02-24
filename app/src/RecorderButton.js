import Button from "@mui/material/Button";
import { useState } from "react";

const RecorderButton = () => {
  const [index, setIndex] = useState(0);
  switch (index) {
    case 0:
      return (
        <Button
          variant="contained"
          onClick={() => {
            window.ipcRenderer.send("show");
            setIndex(1);
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
            setIndex(2);
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
            setIndex(0);
          }}
        >
          Zatrzymaj nagrywanie
        </Button>
      );
  }
};

export default RecorderButton;
