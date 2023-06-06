import { TextField } from "@mui/material";

interface PromptEditorProps {
  curentPromptResultValue?: string;
}

const PromptEditor = ({ curentPromptResultValue }: PromptEditorProps) => {
  return (
    <TextField
      multiline
      rows={50}
      variant="outlined"
      fullWidth
      onChange={() => {}}
      value={curentPromptResultValue}
    />
  );
};

export default PromptEditor;
