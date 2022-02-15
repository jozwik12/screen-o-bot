import Button from "@mui/material/Button";

const App = () => {
  return (
    <div>
      <Button
        variant="contained"
        onClick={() => {
          window.ipcRenderer.send("show");
        }}
      >
        Show
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          window.ipcRenderer.send("hide");
        }}
      >
        Hide
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          window.ipcRenderer.send("openPythonRenderer");
        }}
      >
        Run Python!
      </Button>
    </div>
  );
};

export default App;
