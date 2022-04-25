import { styled } from "@mui/material/styles";
import { keyframes } from "@mui/system";

const blink = keyframes`
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
`;

const RecordingIcon = styled("div")({
  backgroundColor: "red",
  width: 22,
  height: 22,
  animation: `${blink} 2s linear infinite`,
  borderRadius: 16,
});

export default RecordingIcon;
