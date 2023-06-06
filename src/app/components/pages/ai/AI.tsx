import { useState, useEffect, useContext } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { TreeItem, TreeView } from "@mui/lab";
import { Grid, TextField, Select, MenuItem } from "@mui/material";
import MainserverContext from "../../../context/WhiteserverContext";
import { TreeNode } from "@failean/shared-types";
import UserContext from "../../../context/UserContext";

const AI = () => {
  const { axiosInstance } = useContext(MainserverContext);
  const { ideas } = useContext(UserContext);
  const [tree, setTree] = useState<TreeNode>();
  const [currentIdeaId, setCurrentIdeaId] = useState<string>();
  const [curentPromptResultName, setCurrentPromptResultName] =
    useState<string>();
  const [curentPromptResultValue, setCurrentPromptResultValue] =
    useState<string>();

  useEffect(() => {
    const fetchTree = async () => {
      const { data } = await axiosInstance.get("ai/getPromptTree");
      setTree(data.tree);
    };
    fetchTree();
  }, [axiosInstance]);

  useEffect(() => {
    console.log("currentIdeaId: ", currentIdeaId || ideas[0]);
    console.log("curentPromptResultName: ", curentPromptResultName);
    const fetchCurrentPromptResult = async () => {
      if (currentIdeaId || ideas[0]) {
        try {
          console.log("currentIdeaId: ", currentIdeaId || ideas[0]);
          console.log("curentPromptResultName: ", curentPromptResultName);
          const { data } = await axiosInstance.post("ai/getPromptResult", {
            ideaId: currentIdeaId || ideas[0],
            promptName: curentPromptResultName,
          });
          setCurrentPromptResultValue(data.promptResult.data);
        } catch (e) {}
      }
    };
    fetchCurrentPromptResult();
  }, [axiosInstance, ideas, currentIdeaId, curentPromptResultName]);

  const nodeRenderer = (
    node: TreeNode | undefined,
    index: number = Math.random()
  ) =>
    node && (
      <TreeItem
        nodeId={`${Math.random()}`}
        key={index}
        label={node.name}
        onClick={() => setCurrentPromptResultName(node.name)}
      >
        {node.children.map((node: TreeNode, index: number) =>
          nodeRenderer(node, index)
        )}
      </TreeItem>
    );

  return (
    <Grid container direction="column">
      <Grid item>
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
      <Grid item container>
        <Grid item>
          <TreeView
            aria-label="file system navigator"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            sx={{ height: 1000, flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
          >
            {nodeRenderer(tree)}
          </TreeView>
        </Grid>
        <Grid item>
          <TextField
            multiline
            rows={10}
            variant="outlined"
            fullWidth
            onChange={() => {}}
            value={curentPromptResultValue}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AI;
