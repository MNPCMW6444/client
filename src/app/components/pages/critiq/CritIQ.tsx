import React, { useState, useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IdeaSelector from "../../common/IdeaSelector";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import RunCritIQ from "./RunCritIQ";
import IdeaScore from "./IdeaScore";
import ActionList from "./ActionList";
import ValidationRoadmap from "./ValidationRoadmap";

export default function Critiq() {
  const [Category, setCategory] = useState("");
  const [ideaId, setIdeaId] = useState<string>("");
  const [value, setValue] = React.useState("Run CritIQ");
  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
  };

  const [checkedState, setCheckedState] = useState({
    angel: false,
    vc: false,
    customer: false,
  });

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setDisabled(!ideaId);
  }, [ideaId]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedState({
      ...checkedState,
      [event.target.name]: event.target.checked,
    });
  };

  const renderTabContent = () => {
    switch (value) {
      case "Run CritIQ":
        return <RunCritIQ />;
      case "Idea Score":
        return <IdeaScore />;
      case "Action List":
        return <ActionList />;
      case "Validation Roadmap":
        return <ValidationRoadmap />;
      default:
        return null;
    }
  };

  return (
    <>
      <Box>
        <Tabs
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center,",
          }}
          value={value}
          onChange={handleChange}
          textColor="inherit"
          indicatorColor="primary"
          aria-label="ritIQNav"
        >
          <Tab value="Run CritIQ" label="Run CritIQ" />
          <Tab value="Idea Score" label="Idea Score" />
          <Tab value="Action List" label="Action List" />
          <Tab value="Validation Roadmap" label="Validation Roadmap " />
        </Tabs>
      </Box>
      {renderTabContent()}
      <Grid
        container
        alignItems="center"
        direction="column"
        justifyContent="center"
        spacing={2}
      >
        8
      </Grid>
    </>
  );
}
