import { Button } from "@mui/material";
import { styled } from "@mui/material";

export const PromptButton = styled(Button)(({ theme }) => ({
  color: "black" || theme.palette.primary.main,
}));

export const LockedPromptButton = styled(Button)(({ theme }) => ({
  color: "gray" || theme.palette.primary.main,
}));
//seorpiutr