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
  idea: string;
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
  const loadingMessage = (
    <Typography>Loading user account details and ideas...</Typography>
  );
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
      })
      .catch(() => {
        setUser(undefined);
        setLoading(false);
      });
  }, [axiosInstance]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  useEffect(() => {
    user &&
      axiosInstance
        .get("data/getIdeas")
        .then((res) => setIdeas(res.data.ideas))
        .catch(() => setIdeas([]));
  }, [user, axiosInstance]);

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
