import {
  Select,
  MenuItem,
  SelectChangeEvent,
  Grid,
  Typography,
} from "@mui/material";
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
    <Grid
      item
      container
      justifyContent="center"
      alignItems="center"
      columnSpacing={4}
    >
      <Grid item>
        <Typography sx={{ fontSize: "150%" }}>Idea:</Typography>
      </Grid>
      <Grid item>
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
      </Grid>
    </Grid>
  );
};

export default IdeaSelector;
