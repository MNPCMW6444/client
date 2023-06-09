import {
  useState,
  useEffect,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";
import MainserverContext from "../../../context/WhiteserverContext";

interface GraphProps {
  setCurrentPromptResultName: Dispatch<SetStateAction<string>>;
}

const Graph = ({ setCurrentPromptResultName }: GraphProps) => {
  const { axiosInstance } = useContext(MainserverContext);
  const [graph, setGraph] = useState();

  useEffect(() => {
    const fetchGraph = async () => {
      const { data } = await axiosInstance.get("data/getPromptGraph");
      setGraph(data.graph);
    };
    fetchGraph();
  }, [axiosInstance]);

  return <></>;
};

export default Graph;
