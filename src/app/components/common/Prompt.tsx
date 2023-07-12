import { Dispatch, SetStateAction } from "react";
import { PromptName } from "@failean/shared-types";
import { StyledButton } from "../../../content/style/styled-components/all";
import capitalize from "../../util/capitalize";
import { Tooltip } from "@mui/material";

interface PromptProps {
  level: any;
  setOpenPrompt: Dispatch<SetStateAction<PromptName | "closed">>;
}

const Prompt = ({ level, setOpenPrompt }: PromptProps) => {
  const name = capitalize(level.name);
  return level.locked ? (
    <Tooltip
      title={
        "The dependencies:" +
        level.missingDeps.map((name: string) => " " + capitalize(name)) +
        " are empty"
      }
    >
      <StyledButton disabled>{name}</StyledButton>
    </Tooltip>
  ) : (
    <StyledButton onClick={() => setOpenPrompt(level.name)}>
      {name}
    </StyledButton>
  );
};

export default Prompt;
