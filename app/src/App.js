import Button from "@mui/material/Button";

const App = () => {
  return (
    <Button
      variant="contained"
      onClick={() => {
        window.ipcRenderer.send("openRecorder", "true");
      }}
    >
      Hello World!
    </Button>
  );
};

export default App;
