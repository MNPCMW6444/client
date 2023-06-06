import { useState, useEffect, useContext } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { TreeItem, TreeView } from "@mui/lab";
import MainserverContext from "../../../context/WhiteserverContext";

interface TreeNode {
  name: string;
  children: TreeNode[];
}

const AI = () => {
  const { axiosInstance } = useContext(MainserverContext);

  const [tree, setTree] = useState<TreeNode>();

  useEffect(() => {
    const fetchTree = async () => {
      const { data } = await axiosInstance.get("ai/getPromptTree");
      setTree(data.tree);
    };
    fetchTree();
  }, [axiosInstance]);

  const nodeRenderer = (node: TreeNode | undefined) =>
    node && (
      <TreeItem nodeId={`${Math.random()}`} label={node.name}>
        {node.children.map((node: TreeNode) => nodeRenderer(node))}
      </TreeItem>
    );

  return (
    <TreeView
      aria-label="file system navigator"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{ height: 1000, flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
    >
      {nodeRenderer(tree)}
    </TreeView>
  );
};

export default AI;
