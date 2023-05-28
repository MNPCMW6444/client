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

interface Idea {
  _id: string;
  lastRawIdea: string;
}

const UserContext = createContext<{
  user: any;
  ideas: Idea[];
  getUser: () => Promise<void>;
  activeIdeaIndex: number;
  setActiveIdeaIndex: Dispatch<SetStateAction<number>>;
}>({
  user: undefined,
  ideas: [],
  getUser: () => Promise.resolve(),
  activeIdeaIndex: 0,
  setActiveIdeaIndex: () => {},
});

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(undefined);
  const [ideas, setIdeas] = useState<any[]>([]);
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
        setUser(undefined);
      });
    axiosInstance
      .get("data/ideas")
      .then((res) => setIdeas(res.data.ideas))
      .catch(() => setIdeas([]));
  }, [axiosInstance]);

  useEffect(() => {
    const asyncRead = async () => {
      let lideas = [...ideas];
      for (let i = 0; i < lideas.length; i++) {
        const rawIdea = await axiosInstance.post("data/lastRawIdea", {
          idea: lideas[i]._id,
        });
        lideas[i].lastRawIdea = rawIdea.data.rawIdea;
      }
    };
    asyncRead();
  }, [ideas, axiosInstance]);

  useEffect(() => {
    axiosInstance
      .post("data/lastRawIdea", { idea: ideas[activeIdeaIndex]?._id })
      .then((res) => {
        if (activeIdeaIndex > -1) {
          let updatedIdeas = [...ideas];
          updatedIdeas[activeIdeaIndex].lastRawIdea = res.data.rawIdea;
          setIdeas(updatedIdeas);
          setloading(false);
        }
      });
  }, [ideas, axiosInstance, activeIdeaIndex]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <UserContext.Provider
      value={{
        user,
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
