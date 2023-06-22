import { Dispatch, SetStateAction } from "react";
import { Button } from "@mui/material";
import { PromptName } from "@failean/shared-types";
import { capitalize } from "./prompt-dialog/PromptDialog";
import { styled } from "@mui/material";

interface PromptProps {
  promptName: PromptName;
  setOpenPrompt: Dispatch<SetStateAction<PromptName | "closed">>;
}

const PromptButton = styled(Button)(({ theme }) => ({
  color: "black" || theme.palette.primary.main,
}));

const Prompt = ({ promptName, setOpenPrompt }: PromptProps) => {
  return (
    <PromptButton onClick={() => setOpenPrompt(promptName)}>
      {capitalize(promptName)}
    </PromptButton>
  );
};

export default Prompt;
