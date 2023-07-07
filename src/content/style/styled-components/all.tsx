import { styled, Button, Typography } from "@mui/material";

export const PromptButton = styled(Button)(({ theme }) => ({
  color: "black" || theme.palette.primary.main,
}));

export const LockedPromptButton = styled(Button)(({ theme }) => ({
  color: "gray" || theme.palette.primary.main,
}));

export const loading = () => <Typography>Loading...</Typography>;
