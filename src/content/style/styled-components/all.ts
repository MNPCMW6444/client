import { Button } from "@mui/material";
import { styled } from "@mui/material";

export const PromptButton = styled(Button)(({ theme }) => ({
  color: "yellow" || theme.palette.primary.main,
  backgroundColor: "transparent",
  border: `2px solid ${theme.palette.primary.main}`,
  borderRadius: "5px",
  padding: "10px 20px",
  "& .MuiButton-label": {
    fontWeight: "bold",
  },
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    color: "white",
  },
  transition: "background-color 0.3s ease",
}));

export const LockedPromptButton = styled(Button)(({ theme }) => ({
  color: "gray" || theme.palette.primary.main,
  backgroundColor: "transparent",
  border: `2px solid ${theme.palette.primary.main}`,
  borderRadius: "5px",
  padding: "1px 5px",
  "& .MuiButton-label": {
    fontStyle: "italic",
  },
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    color: "white",
  },
  transition: "background-color 0.3s ease",
  margin: "0 2px", 
}));

