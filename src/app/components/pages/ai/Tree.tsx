import {
  useState,
  useEffect,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";
import { TreeItem, TreeView } from "@mui/lab";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { TreeNode } from "@failean/shared-types";
import MainserverContext from "../../../context/WhiteserverContext";

interface TreeProps {
  setCurrentPromptResultName: Dispatch<SetStateAction<string>>;
}

const Tree = ({ setCurrentPromptResultName }: TreeProps) => {
  const { axiosInstance } = useContext(MainserverContext);
  const [tree, setTree] = useState<TreeNode>();

  useEffect(() => {
    const fetchTree = async () => {
      const { data } = await axiosInstance.get("data/getPromptTree");
      setTree(data.tree);
    };
    fetchTree();
  }, [axiosInstance]);

  const nodeRenderer = (
    node: TreeNode | undefined,
    index: number = Math.random()
  ) =>
    node && (
      <TreeItem
        nodeId={node.name}
        key={index}
        label={
          node.name
            .replace(/([A-Z])/g, " $1")
            .charAt(0)
            .toUpperCase() + node.name.replace(/([A-Z])/g, " $1").slice(1)
        }
        onClick={() => setCurrentPromptResultName(node.name)}
      >
        {node.children.map((node: TreeNode, index: number) =>
          nodeRenderer(node, index)
        )}
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

export default Tree;
