import { useState, useEffect, useContext } from "react";
import { Grid, Select, MenuItem } from "@mui/material";
import MainserverContext from "../../../context/WhiteserverContext";
import UserContext from "../../../context/UserContext";
import Tree from "./Tree";
import PromptEditor from "./PromptEditor";

const AI = () => {
  const { axiosInstance } = useContext(MainserverContext);
  const { ideas } = useContext(UserContext);
  const [currentIdeaId, setCurrentIdeaId] = useState<string>(ideas[0]._id);
  const [currentPromptResultName, setCurrentPromptResultName] =
    useState<string>("idea");
  const [curentPromptResultValue, setCurrentPromptResultValue] =
    useState<string>();

  useEffect(() => {
    const fetchCurrentPromptResult = async () => {
      if (currentIdeaId || ideas[0]) {
        try {
          if (currentPromptResultName && currentPromptResultName !== "idea") {
            const { data } = await axiosInstance.post("data/getPromptResult", {
              ideaId: currentIdeaId || ideas[0],
              promptName: currentPromptResultName,
            });
            setCurrentPromptResultValue(
              data.promptResult[data.promptResult.length - 1].data
            );
          } else
            setCurrentPromptResultValue(
              ideas.find((idea) => idea._id === (currentIdeaId || ideas[0]._id))
                ?.idea
            );
        } catch (e) {
          console.log(e);
        }
      }
    };
    fetchCurrentPromptResult();
  }, [axiosInstance, ideas, currentIdeaId, currentPromptResultName]);

  return (
    <Grid
      container
      direction="column"
      width="100%"
      rowSpacing={4}
      alignItems="center"
    >
      <Grid item width="100%">
        <Select
          fullWidth
          value={currentIdeaId}
          onChange={(e) => setCurrentIdeaId(e.target.value)}
        >
          {ideas.map((idea, index) => (
            <MenuItem key={index} value={idea._id}>
              {idea?.idea}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid item width="100%" container columnSpacing={4}>
        <Grid item width="40%">
          <Tree setCurrentPromptResultName={setCurrentPromptResultName} />
        </Grid>
        <PromptEditor
          curentPromptResultValue={curentPromptResultValue}
          setCurrentPromptResultValue={setCurrentPromptResultValue}
          ideaId={currentIdeaId || ideas[0]._id}
          promptName={currentPromptResultName || "validation"}
        />
      </Grid>
    </Grid>
  );
};

export default AI;
