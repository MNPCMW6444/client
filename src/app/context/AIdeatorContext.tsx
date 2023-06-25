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
import { PromptGraph, WhiteModels } from "@failean/shared-types";
import UserContext from "./UserContext";
import capitalize from "../util/capitalize";

const AIdeatorContext = createContext<{
  currentIdeaId: string;
  setCurrentIdeaId: Dispatch<SetStateAction<string>> | undefined;
  graph: PromptGraph;
  refreshGraph: () => Promise<void>;
  loaded: string;
}>({
  currentIdeaId: "",
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
      setLoaded("");
      setGraph(
        baseGraph.map((x: any, index: number) => ({
          ...x,
          result: index === 0 ? "idea" : results[index],
        }))
      );
    }
  }, [axiosInstance, currentIdeaId]);

  useEffect(() => {
    refreshGraph();
  }, [refreshGraph]);

  return (
    <AIdeatorContext.Provider
      value={{
        currentIdeaId,
        setCurrentIdeaId,
        graph,
        refreshGraph,
        loaded,
      }}
    >
      {children}
    </AIdeatorContext.Provider>
  );
};

export default AIdeatorContext;
