import FolderRoundedIcon from "@mui/icons-material/FolderRounded";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import IconButton from "@mui/material/IconButton";
import RecorderButton from "./RecorderButton";
import ShowProgramState from "./ShowProgramState";
import Disclaimer from "./Disclaimer";
import { useEffect, useState, createContext } from "react";
import ProjectInfo from "./ProjectInfo";
import { Grid } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { styled } from "@mui/material/styles";
import MuiTextField from "@mui/material/TextField";
import { useTour } from "@reactour/tour";

export const ProgramStateContext = createContext();

const TextField = styled(MuiTextField)(() => ({
  "& .MuiOutlinedInput-root": {
    paddingRight: 0,
  },
}));

const App = () => {
  const [programState, setProgramState] = useState(0);
  const [showLoading, setShowLoading] = useState(false);
  const [savePath, setSavePath] = useState("");
  const [monitorAmount, setMonitorAmount] = useState(0);
  const [appVersion, setAppVersion] = useState("");
  const [electronVersion, setElectronVersion] = useState("");
  const { setIsOpen } = useTour();

  const getDefaultSavePath = async () => {
    setSavePath(await window.ipcRenderer.invoke("get-default-save-path"));
  };

  const getSavePathFromMainProcess = async () => {
    const newPath = await window.ipcRenderer.invoke("select-save-dir");
    if (newPath) {
      setSavePath(newPath);
    }
  };

  const getMonitorAmount = async () => {
    setMonitorAmount(await window.ipcRenderer.invoke("monitor-amount"));
  };

  const getAppVersion = async () => {
    setAppVersion(await window.ipcRenderer.invoke("app-version"));
  };

  const getElectronVersion = async () => {
    setElectronVersion(await window.ipcRenderer.invoke("electron-version"));
  };

  useEffect(() => {
    getDefaultSavePath();
    getMonitorAmount();
    getAppVersion();
    getElectronVersion();
  }, []);

  return (
    <ProgramStateContext.Provider
      value={{ programState, setProgramState, showLoading, setShowLoading }}
    >
      <Grid
        container
        sx={{
          display: "flex",
          alignContent: "center",
          width: 496,
          p: "2px",
          gap: "12px",
        }}
      >
        <Grid
          item
          sx={{
            display: "flex",
            alignItems: "center",
            p: "0px",
          }}
        >
          <RecorderButton />
          <IconButton onClick={() => setIsOpen(true)}>
            <HelpOutlineIcon
              className="Help"
              color="primary"
              fontSize="large"
            />
          </IconButton>
          <ProjectInfo
            appVersion={appVersion}
            electronVersion={electronVersion}
          />
          <Disclaimer />
        </Grid>
        <Grid item>
          <TextField
            className="SavePath"
            size="small"
            value={savePath}
            disabled
            helperText="Folder zapisu"
            sx={{
              width: 480,
              pointerEvents: "none",
              userSelect: "none",
              input: {
                "-webkit-text-fill-color": `rgba(0,0,0,0.85) !important`,
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    className="ChooseSavePath"
                    variant="contained"
                    component="label"
                    onClick={getSavePathFromMainProcess}
                    sx={{ pointerEvents: "all" }}
                  >
                    <FolderRoundedIcon color="primary" fontSize="large" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          ></TextField>
        </Grid>
        <Grid item>
          <ShowProgramState monitorAmount={monitorAmount}></ShowProgramState>
        </Grid>
      </Grid>
    </ProgramStateContext.Provider>
  );
};

export default App;
