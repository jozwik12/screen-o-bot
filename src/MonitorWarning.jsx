import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const MonitorWarning = (props) => {
  return (
    props.monitorAmount > 1 && (
      <Alert severity="warning" sx={{ pb: "16px" }}>
        <AlertTitle>Wykryto więcej niż jeden monitor</AlertTitle>
        Przechwytywanie ekranu działa wyłącznie na{" "}
        <strong>monitorze głównym</strong>
      </Alert>
    )
  );
};

export default MonitorWarning;
