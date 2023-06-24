import { Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { useContext, Dispatch, SetStateAction } from "react";
import UserContext from "../../context/UserContext";

interface IdeaSelectorProps {
  selectedIdeaId: string;
  setSelectedIdeaId: Dispatch<SetStateAction<string>>;
}

const IdeaSelector = ({
  selectedIdeaId,
  setSelectedIdeaId,
}: IdeaSelectorProps) => {
  const { ideas } = useContext(UserContext);

  return (
    <Select
      value={selectedIdeaId}
      onChange={(event: SelectChangeEvent) =>
        setSelectedIdeaId(event.target.value)
      }
    >
      {ideas.map((idea, index) => (
        <MenuItem key={index} value={idea._id}>
          {idea?.idea.substring(0, 20)}
        </MenuItem>
      ))}
    </Select>
  );
};

export default IdeaSelector;
