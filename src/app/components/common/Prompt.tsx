import { Dispatch, SetStateAction } from "react";
import { PromptName } from "@failean/shared-types";
import {
  PromptButton,
  LockedPromptButton,
} from "../../../content/style/styled-components/all";
import capitalize from "../../util/capitalize";

interface PromptProps {
  promptName: PromptName;
  locked: boolean;
  setOpenPrompt: Dispatch<SetStateAction<PromptName | "closed">>;
}

const Prompt = ({ promptName, locked, setOpenPrompt }: PromptProps) => {
  const name = capitalize("promptName");
  return locked ? (
    <LockedPromptButton>{name}</LockedPromptButton>
  ) : (
    <PromptButton onClick={() => setOpenPrompt(promptName)}>
      {name}
    </PromptButton>
  );
};

export default Prompt;
