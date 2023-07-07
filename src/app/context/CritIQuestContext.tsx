import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";
import { MainserverContext } from "@failean/mainserver-provider";
import UserContext from "./UserContext";

interface Answer {
  ideaID: string;
  questionId: string;
  answer: string;
  score: number;
}

const CritIQuestContext = createContext<{
  currentIdeaID: string;
  setCurrentIdeaID: Dispatch<SetStateAction<string>> | undefined;
  answerHistory: Answer[];
  fetchAnswerHistory: () => Promise<void>;
  updateAnswer: (answer: Answer) => Promise<void>;
}>({
  currentIdeaID: "",
  setCurrentIdeaID: undefined,
  answerHistory: [],
  fetchAnswerHistory: async () => {},
  updateAnswer: async () => {},
});

export const CritIQuestContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const mainserverContext = useContext(MainserverContext);
  const { ideas } = useContext(UserContext);

  const axiosInstance = mainserverContext?.axiosInstance;
  const [answerHistory, setAnswerHistory] = useState<Answer[]>([]);
  const [currentIdeaID, setCurrentIdeaID] = useState<string>("");

  useEffect(() => {
    setCurrentIdeaID(ideas[0]?._id || "");
  }, [ideas]);

  const fetchAnswerHistory = useCallback(async () => {
    if (axiosInstance && currentIdeaID) {
      const { data } = await axiosInstance.get(
        `/data/critiqQuestionire/${currentIdeaID}`
      );
      setAnswerHistory(data || []);
    }
  }, [axiosInstance, currentIdeaID]);

  const updateAnswer = useCallback(
    async (answer: Answer) => {
      if (axiosInstance) {
        const { data } = await axiosInstance.post(
          "/data/critiqQuestionire/update",
          answer
        );
        fetchAnswerHistory();
      }
    },
    [axiosInstance, fetchAnswerHistory]
  );

  useEffect(() => {
    fetchAnswerHistory();
  }, [fetchAnswerHistory]);

  return (
    <CritIQuestContext.Provider
      value={{
        currentIdeaID,
        setCurrentIdeaID,
        answerHistory,
        fetchAnswerHistory,
        updateAnswer,
      }}
    >
      {children}
    </CritIQuestContext.Provider>
  );
};

export default CritIQuestContext;
