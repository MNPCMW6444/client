import {
  useState,
  useEffect,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";
import { MainserverContext } from "@failean/mainserver-provider";
import { Typography } from "@mui/material";
import { styled } from "@mui/system";
import { PromptGraph, WhiteModels } from "@failean/shared-types";
import UserContext from "./UserContext";
import capitalize from "../util/capitalize";

const WhiteTypography = styled(Typography)(({ theme }) => ({
  fontFamily: "Monospace",
  fontWeight: "bold",
  fontSize: 32,
  letterSpacing: 2,
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(1),
}));

const loadingMessage = (
  <WhiteTypography>Loading promt result...</WhiteTypography>
);

const AIdeatorContext = createContext<{
  setCurrentIdeaId: Dispatch<SetStateAction<string>> | undefined;
  graph: PromptGraph;
  refreshGraph: () => Promise<void>;
  loaded: string;
}>({
  setCurrentIdeaId: undefined,
  graph: [],
  refreshGraph: () => Promise.resolve(),
  loaded: "",
});

export const AIdeatorContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const mainserverContext = useContext(MainserverContext);
  const { ideas } = useContext(UserContext);

  const axiosInstance = mainserverContext?.axiosInstance;
  const [graph, setGraph] = useState([]);
  const [currentIdeaId, setCurrentIdeaId] = useState<string>(
    ideas[0]?._id || ""
  );
  const [loaded, setLoaded] = useState<string>("");

  const refreshGraph = useCallback(async () => {
    if (axiosInstance) {
      const { data } = await axiosInstance.get("data/prompts/getPromptGraph");
      const baseGraph = data.graph;
      let results: WhiteModels.Data.Prompts.WhitePromptResult[] = [];
      for (const prompt of baseGraph) {
        setLoaded(capitalize(prompt.name));
        results.push(
          (
            await axiosInstance.post("data/prompts/getPromptResult", {
              ideaId: currentIdeaId,
              promptName: prompt.name,
            })
          ).data || "empty"
        );
      }
      setGraph(
        baseGraph.map((x: any, index: number) => ({
          ...x,
          result: index === 0 ? "idea" : results[index],
        }))
      );
    }
  }, [currentIdeaId]);

  useEffect(() => {
    refreshGraph();
  }, [refreshGraph]);

  return (
    <AIdeatorContext.Provider
      value={{
        setCurrentIdeaId,
        graph,
        refreshGraph,
        loaded,
      }}
    >
      {loaded ? loadingMessage : children}
    </AIdeatorContext.Provider>
  );
};

export default AIdeatorContext;
