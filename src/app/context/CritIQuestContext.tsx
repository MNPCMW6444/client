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
  ideaId: string;
  questionId: string;
  answer: string;
  score: number;
}

const CritIQuestContext = createContext<{
  currentIdeaId: string;
  setCurrentIdeaId: Dispatch<SetStateAction<string>> | undefined;
  answerHistory: Answer[];
  fetchAnswerHistory: () => Promise<void>;
  updateAnswer: (answer: Answer) => Promise<void>;
}>({
  currentIdeaId: "",
  setCurrentIdeaId: undefined,
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
  const [currentIdeaId, setCurrentIdeaId] = useState<string>("");

  useEffect(() => {
    setCurrentIdeaId(ideas[0]?._id || "");
  }, [ideas]);

  const fetchAnswerHistory = useCallback(async () => {
    if (axiosInstance && currentIdeaId) {
      const { data } = await axiosInstance.get(
        `/data/answers/${currentIdeaId}`
      );
      setAnswerHistory(data || []);
    }
  }, [axiosInstance, currentIdeaId]);

  const updateAnswer = useCallback(
    async (answer: Answer) => {
      if (axiosInstance) {
        const { data } = await axiosInstance.post(
          "/data/answers/update",
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
        currentIdeaId,
        setCurrentIdeaId,
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
