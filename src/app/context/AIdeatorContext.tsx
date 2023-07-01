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

  const JOB_COMPLETED = gql`
    subscription Subscription {
      jobCompleted
    }
  `;

  const { data, loading, error } = useSubscription(JOB_COMPLETED, {
    variables: {},
  });

  console.log("Loading:", loading);
  console.log("Error:", error);
  console.log("Data:", data);

  const fetchGraph = useCallback(async () => {
    if (axiosInstance) {
      const { data } = await axiosInstance.get("data/prompts/getPromptGraph");
      const baseGraph = data.graph;
      setLoaded("graph");
      setGraph([]);
      let results = (
        await axiosInstance.post("data/prompts/getPromptResult", {
          ideaId: currentIdeaId,
          promptName: "all",
        })
      ).data.promptResult;

      results.sort(
        (a: any, b: any) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );

      let result: { [key: string]: { data: string; updatedAt: string } } = {};

      // We are now iterating over sorted array
      results.forEach((item: any) => {
        // If the key doesn't exist in the result object, or the current item's date is more recent, update the value
        if (
          !result[item.promptName] ||
          new Date(item.updatedAt).getTime() >
            new Date(result[item.promptName].updatedAt).getTime()
        ) {
          result[item.promptName] = {
            data: item.data,
            updatedAt: item.updatedAt,
          };
        }
      });
      setGraph(
        baseGraph.map((x: any, index: number) => ({
          ...x,
          result: index === 0 ? "idea" : result[x.promptName] || "empty",
        }))
      );
      setLoaded("");
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
