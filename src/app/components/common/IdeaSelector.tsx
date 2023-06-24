import {
  Select,
  MenuItem,
  SelectChangeEvent,
  Grid,
  Typography,
} from "@mui/material";
import { useContext, useState, Dispatch, SetStateAction } from "react";
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
  const [open, setOpen] = useState(false);
  const selectedIdea = ideas.find((idea) => idea._id === selectedIdeaId);

  const select = (
    <Select
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      value={selectedIdeaId}
      onChange={(event: SelectChangeEvent) =>
        setSelectedIdeaId(event.target.value)
      }
      style={{ minWidth: "200px", maxWidth: "70vw" }}
    >
      {ideas.map((idea, index) => (
        <MenuItem
          key={index}
          value={idea._id}
          style={{
            whiteSpace: "nowrap",
            overflowX: "auto",
            maxWidth: "70vw",
          }}
        >
          {idea?.idea}
        </MenuItem>
      ))}
    </Select>
  );

  return (
    <Grid
      item
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      columnSpacing={4}
      wrap="nowrap"
    >
      {label !== null && (
        <Grid item>
          <Typography sx={{ fontSize: `${fontSizeFactor || 150}%` }}>
            {label || "Idea:"}
          </Typography>
        </Grid>
      )}
      <Grid item>{select}</Grid>
    </Grid>
  );
};

export default IdeaSelector;
