import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const ProgramState = (props) => {
  const componentStyle = { pb: "16px", width: 448 };
  if (props.monitorAmount > 1)
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
