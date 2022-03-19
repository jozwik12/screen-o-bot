import FolderRoundedIcon from "@mui/icons-material/FolderRounded";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import IconButton from "@mui/material/IconButton";
import RecorderButton from "./RecorderButton";
import MonitorWarning from "./MonitorWarning";
import Disclaimer from "./Disclaimer";
import { useEffect, useState } from "react";
import ProjectInfo from "./ProjectInfo";
import { Grid } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { styled } from "@mui/material/styles";
import MuiTextField from "@mui/material/TextField";
import { useTour } from "@reactour/tour";

const TextField = styled(MuiTextField)(() => ({
  "& .MuiOutlinedInput-root": {
    paddingRight: 0,
  },
}));

const App = () => {
  const [savePath, setSavePath] = useState("");
  const [monitorAmount, setMonitorAmount] = useState(0);
  const [appVersion, setAppVersion] = useState("");
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

  useEffect(() => {
    getDefaultSavePath();
    getMonitorAmount();
    getAppVersion();
  }, []);

  return (
    <Grid
      container
      sx={{
        display: "flex",
        alignContent: "center",
        width: 496,
        p: "2px",
        gap: "32px",
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
          <HelpOutlineIcon className="Help" color="primary" fontSize="large" />
        </IconButton>
        <ProjectInfo appVersion={appVersion} />
        <Disclaimer />
      </Grid>
      <Grid item>
        <TextField
          className="SavePath"
          id="filled-hidden-label-small"
          size="small"
          value={savePath}
          disabled
          helperText="Folder zapisu"
          sx={{ width: 480 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  className="ChooseSavePath"
                  variant="contained"
                  component="label"
                  onClick={getSavePathFromMainProcess}
                >
                  <FolderRoundedIcon color="primary" fontSize="large" />
                </IconButton>
              </InputAdornment>
            ),
          }}
        ></TextField>
      </Grid>
      <Grid item>
        <MonitorWarning monitorAmount={monitorAmount}></MonitorWarning>
      </Grid>
    </Grid>
  );
};

export default App;
