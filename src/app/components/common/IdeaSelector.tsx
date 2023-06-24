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
  label?: string | null;
  fontSizeFactor?: number;
}

const IdeaSelector = ({
  selectedIdeaId,
  setSelectedIdeaId,
  label,
  fontSizeFactor,
}: IdeaSelectorProps) => {
  const { ideas } = useContext(UserContext);

  const select = (
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

  return label === null ? (
    select
  ) : (
    <Grid
      item
      container
      justifyContent="center"
      alignItems="center"
      columnSpacing={4}
    >
      <Grid item>
        <Typography sx={{ fontSize: `${fontSizeFactor || 150}%` }}>
          {label || "Idea:"}
        </Typography>
      </Grid>
      <Grid item></Grid>
    </Grid>
  );
};

export default IdeaSelector;
