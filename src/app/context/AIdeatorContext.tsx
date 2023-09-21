import {
    useState,
    useEffect,
    ReactNode,
    createContext,
    useCallback,
    useContext,
    Dispatch,
    SetStateAction, memo,
} from "react";
import {MainserverContext} from "@failean/mainserver-provider";
import {Prompt, PromptGraph, PromptName, PromptWireframe, WhiteModels} from "@failean/shared-types";
import UserContext from "./UserContext";
import capitalize from "../util/capitalize";
import WhitePromptResult = WhiteModels.Data.Prompts.WhitePromptResult;

const AIdeatorContext = createContext<{
    currentIdeaID: string;
    setCurrentIdeaID: Dispatch<SetStateAction<string>> | undefined;
    graph: PromptGraph;
    loaded: string;
    fetchGraph: () => Promise<void>;
    fetchOneResult: (name: PromptName) => Promise<void>;
    setPolled: Dispatch<SetStateAction<PromptName[]>> | undefined;
    polled: PromptName[];
}>({
    currentIdeaID: "",
    setCurrentIdeaID: undefined,
    graph: [],
    loaded: "",
    fetchGraph: async () => {
    },
    fetchOneResult: async () => {
    },
    setPolled: undefined,
    polled: [],
});

export const AIdeatorContextProvider = memo(({
                                                 children,
                                             }: {
    children: ReactNode;
}) => {
    const mainserverContext = useContext(MainserverContext);
    const axiosInstance = mainserverContext?.axiosInstance;
    const {ideas, refreshUserData} = useContext(UserContext);
    const [graph, setGraph] = useState<PromptGraph>([]);
    const [currentIdeaID, setCurrentIdeaID] = useState<string>(
        ideas[0]?._id || ""
    );
    const [loaded, setLoaded] = useState<string>("");
    const [polled, setPolled] = useState<PromptName[]>([]);
    /*
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
    console.log("Data:", data); */

    const fetchGraph = useCallback(async () => {
        console.log("fetchGraph");

        try {
            if (axiosInstance) {
                const {data} = await axiosInstance.get("data/prompts/getPromptGraph");
                const baseGraph: PromptWireframe[] = data.graph;
                setLoaded("graph");

                setGraph([]);
                let results: WhiteModels.Data.Prompts.WhitePromptResult[] = (
                    await axiosInstance.post("data/prompts/getPromptResult", {
                        ideaID: currentIdeaID,
                        promptName: "all",
                    })
                ).data.promptResult;

                results.sort(
                    (a, b) =>
                        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
                );

                let result: {
                    [key: PromptName]: (WhiteModels.Data.Prompts.WhitePromptResult | (WhitePromptResult | "idea" | "empty"))
                } = {};


                // We are now iterating over sorted array
                results.forEach((item) => {
                    // If the key doesn't exist in the result object, or the current item's date is more recent, update the value
                    if (
                        !result[item.promptName] ||
                        new Date(item.updatedAt).getTime() >
                        new Date((result[item.promptName] as WhiteModels.Data.Prompts.WhitePromptResult).updatedAt).getTime()
                    ) {
                        result[item.promptName] = item.data as WhitePromptResult | "idea" | "empty";
                    }
                });
                setGraph(
                    baseGraph.map((x, index: number) => ({
                        ...x,
                        result: index === 0 ? "idea" : (result[x.name]) || "empty",
                    }))
                );
                setLoaded("");
            }
        } catch (e) {
        }
    }, [axiosInstance, currentIdeaID]);

    const fetchOneResult = useCallback(
        async (name: PromptName) => {
            setPolled((pp) => [...new Set(pp)]);
            try {
                if (axiosInstance) {
                    setLoaded(capitalize(name));
                    const res =
                        (
                            await axiosInstance.post("data/prompts/getPromptResult", {
                                ideaID: currentIdeaID,
                                promptName: name,
                            })
                        ).data?.promptResult?.data || "empty";

                    if (res.length > 2 && res !== "empty")
                        setPolled((pp) => pp.filter((x) => x !== name));


                    setGraph((pg) =>
                        pg.map((graphNode: Prompt) => ({
                            ...graphNode,
                            result: res,
                        }))
                    );
                    setLoaded("");
                }
            } catch (e) {
                console.log(e);
            }
        },
        [axiosInstance, currentIdeaID]
    );
 
    useEffect(() => {
        fetchGraph();
        refreshUserData();
        const interval = setInterval(
            () => polled.forEach((name) => fetchOneResult(name)),
            5000
        );
        return () => clearInterval(interval);
    }, [fetchGraph, fetchOneResult, polled, refreshUserData]);

    return (
        <AIdeatorContext.Provider
            value={{
                currentIdeaID,
                setCurrentIdeaID,
                graph,
                loaded,
                fetchGraph,
                fetchOneResult,
                setPolled,
                polled,
            }}
        >
            {children}
        </AIdeatorContext.Provider>
    );
});

export default (AIdeatorContext);
