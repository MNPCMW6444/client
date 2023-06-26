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
import {
  Prompt,
  PromptGraph,
  PromptName,
  WhiteModels,
} from "@failean/shared-types";
import UserContext from "./UserContext";
import capitalize from "../util/capitalize";
import { gql, useSubscription } from "@apollo/client";

const AIdeatorContext = createContext<{
  currentIdeaId: string;
  setCurrentIdeaId: Dispatch<SetStateAction<string>> | undefined;
  graph: PromptGraph;
  loaded: string;
  fetchGraph: () => Promise<void>;
  fetchOneResult: (name: PromptName) => Promise<void>;
}>({
  currentIdeaId: "",
  setCurrentIdeaId: undefined,
  graph: [],
  loaded: "",
  fetchGraph: async () => {},
  fetchOneResult: async () => {},
});

export const AIdeatorContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const mainserverContext = useContext(MainserverContext);
  const { ideas } = useContext(UserContext);

  const axiosInstance = mainserverContext?.axiosInstance;
  const [graph, setGraph] = useState<PromptGraph>([]);
  const [currentIdeaId, setCurrentIdeaId] = useState<string>(
    ideas[0]?._id || ""
  );
  const [loaded, setLoaded] = useState<string>("");

  const JOBS_SUBSCRIPTION = gql`
    subscription JobUpdated {
      jobUpdated {
        email
        id
        username
      }
    }
  `;

  const { data, loading } = useSubscription(JOBS_SUBSCRIPTION, {
    variables: {},
  });

  console.log(data);

  const [jobs, setjobs] = useState<number[]>([]);

  const fetchGraph = useCallback(async () => {
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

  const fetchOneResult = async (name: PromptName) => {
    if (axiosInstance) {
      setLoaded(capitalize(name));
      const res =
        (
          await axiosInstance.post("data/prompts/getPromptResult", {
            ideaId: currentIdeaId,
            promptName: name,
          })
        ).data || "empty";
      setGraph(
        graph.map((graphNode: Prompt) => ({
          ...graphNode,
          result: res,
        }))
      );
      setLoaded("");
    }
  };

  useEffect(() => {
    fetchGraph();
  }, [fetchGraph]);

  return (
    <AIdeatorContext.Provider
      value={{
        currentIdeaId,
        setCurrentIdeaId,
        graph,
        loaded,
        fetchGraph,
        fetchOneResult,
      }}
    >
      {children}
    </AIdeatorContext.Provider>
  );
};

export default AIdeatorContext;
