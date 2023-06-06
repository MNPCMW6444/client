import { useState, useEffect, useContext } from "react";
import { Grid, Select, MenuItem } from "@mui/material";
import MainserverContext from "../../../context/WhiteserverContext";
import UserContext from "../../../context/UserContext";
import Tree from "./Tree";
import PromptEditor from "./PromptEditor";

const AI = () => {
  const { axiosInstance } = useContext(MainserverContext);
  const { ideas } = useContext(UserContext);
  const [currentIdeaId, setCurrentIdeaId] = useState<string>();
  const [curentPromptResultName, setCurrentPromptResultName] =
    useState<string>();
  const [curentPromptResultValue, setCurrentPromptResultValue] =
    useState<string>();

  useEffect(() => {
    const fetchCurrentPromptResult = async () => {
      if (currentIdeaId || ideas[0]) {
        try {
          if (curentPromptResultName && curentPromptResultName !== "idea") {
            const { data } = await axiosInstance.post("ai/getPromptResult", {
              ideaId: currentIdeaId || ideas[0],
              promptName: curentPromptResultName,
            });
            setCurrentPromptResultValue(data.promptResult[0].data);
          } else
            setCurrentPromptResultValue(
              ideas.find((idea) => idea._id === currentIdeaId || ideas[0]._id)
                ?.idea
            );
        } catch (e) {
          console.log(e);
        }
      }
    };
    fetchCurrentPromptResult();
  }, [axiosInstance, ideas, currentIdeaId, curentPromptResultName]);

  return (
    <Grid container direction="column" width="100%">
      <Grid item width="100%">
        <Select
          value={currentIdeaId || ideas[0]._id}
          onChange={(e) => setCurrentIdeaId(e.target.value)}
        >
          {ideas.map((idea, index) => (
            <MenuItem key={index} value={idea._id}>{`${
              index + 1
            }: ${idea?.idea?.substring(0, 5)}...`}</MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid item width="100%" container>
        <Grid item width="25%">
          <Tree setCurrentPromptResultName={setCurrentPromptResultName} />
        </Grid>
        <Grid item width="75%">
          <PromptEditor curentPromptResultValue={curentPromptResultValue} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AI;
