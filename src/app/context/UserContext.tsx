import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Typography } from "@mui/material";
import MainserverContext from "./MainserverContext";

const UserContext = createContext<{
  user: any;
  ideas: any[];
  lastRawIdea: string;
  getUser: () => Promise<void>;
  activeIdeaIndex: number;
  setActiveIdeaIndex: Dispatch<SetStateAction<number>>;
}>({
  user: undefined,
  ideas: [],
  lastRawIdea: "",
  getUser: () => Promise.resolve(),
  activeIdeaIndex: 0,
  setActiveIdeaIndex: () => {},
});

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(undefined);
  const [ideas, setIdeas] = useState<any[]>([]);
  const [lastRawIdea, setLastRawIdea] = useState<string>("");
  const { axiosInstance } = useContext(MainserverContext);
  const loadingMessage = <Typography>Loading lilush...</Typography>;
  const [loading, setloading] = useState(true);

  const [activeIdeaIndex, setActiveIdeaIndex] = useState<number>(
    ideas.length - 1
  );

  useEffect(() => {
    setActiveIdeaIndex(ideas.length - 1);
  }, [ideas.length]);

  const getUser = useCallback(async () => {
    axiosInstance
      .get("auth/signedin")
      .then((userRes) => {
        setUser(userRes.data);
      })
      .catch(() => {
        setloading(false);
        setUser(undefined);
      });
    axiosInstance
      .get("data/ideas")
      .then((res) => setIdeas(res.data.ideas))
      .catch(() => setIdeas([]));
  }, [axiosInstance]);

  useEffect(() => {
    axiosInstance
      .post("data/rawIdeas", { idea: ideas[activeIdeaIndex]?._id })
      .then((res) => {
        setLastRawIdea(res.data.rawIdeas.rawIdea);
        setloading(false);
      })
      .catch(() => setLastRawIdea(""));
  }, [ideas, axiosInstance, activeIdeaIndex]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <UserContext.Provider
      value={{
        user,
        lastRawIdea,
        ideas,
        getUser,
        activeIdeaIndex,
        setActiveIdeaIndex,
      }}
    >
      {loading ? loadingMessage : children}
    </UserContext.Provider>
  );
};

export default UserContext;
