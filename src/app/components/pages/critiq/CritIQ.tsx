import { useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import RunCritIQ from "./RunCritIQ";
import IdeaScore from "./IdeaScore";
import CritIQChat from "./CritiChat";
import ValidationRoadmap from "./ValidationRoadmap";

export default function Critiq() {
  const [value, setValue] = useState("");

  const handleChange = (event: React.SyntheticEvent, newValue: any) => {
    setValue(newValue);
  };

  const renderTabContent = () => {
    switch (value) {
      case "Run CritIQ":
        return <RunCritIQ />;
      case "Idea Score":
        return <IdeaScore />;
      case "CritIQ Chat":
        return <CritIQChat />;
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
          <Tab value="CritIQ Chat" label="CritIQ Chat" />
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
      ></Grid>
    </>
  );
}
