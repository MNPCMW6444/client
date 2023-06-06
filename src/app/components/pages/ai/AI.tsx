import { useState, useEffect, useContext } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { TreeItem, TreeView } from "@mui/lab";
import MainserverContext from "../../../context/WhiteserverContext";

const AI = () => {
  const { axiosInstance } = useContext(MainserverContext);

  const [tree, setTree] = useState({});

  useEffect(() => {
    const fetchTree = async () => {
      const { data } = await axiosInstance.get("ai/xxx");
      setTree(data.order);
    };
    fetchTree();
  }, []);

  console.log(tree);

  return (
    <TreeView
      aria-label="file system navigator"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
    >
      <TreeItem nodeId="1" label="Applications">
        <TreeItem nodeId="2" label="Calendar" />
      </TreeItem>
      <TreeItem nodeId="5" label="Documents">
        <TreeItem nodeId="10" label="OSS" />
        <TreeItem nodeId="6" label="MUI">
          <TreeItem nodeId="8" label="index.js" />
        </TreeItem>
      </TreeItem>
    </TreeView>
  );
};

export default AI;
