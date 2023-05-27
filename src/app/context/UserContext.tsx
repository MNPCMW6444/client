import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Typography } from "@mui/material";
import { MainServerContext } from "./MainServerContext";

const UserContext = createContext<{
  user: any;
  ideas: string[];
  lastRawIdea: string;
  getUser: () => Promise<void>;
}>({
  user: undefined,
  ideas: [],
  lastRawIdea: "",
  getUser: () => Promise.resolve(),
});

function UserContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState(undefined);
  const [ideas, setIdeas] = useState<string[]>([]);
  const [lastRawIdea, setLastRawIdea] = useState<string>("");
  const axiosInstance = useContext(MainServerContext);
  const loadingMessage = <Typography>Loading lilush...</Typography>;
  const [loading, setloading] = useState(true);

  const getUser = useCallback(async () => {
    axiosInstance
      .get("auth/signedin")
      .then((userRes) => {
        setloading(false);
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
      .post("data/rawIdeas", { idea: ideas[ideas.length - 1] })
      .then((res) => setLastRawIdea(res.data.ideas))
      .catch(() => setLastRawIdea(""));
  }, [ideas]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <UserContext.Provider value={{ user, lastRawIdea, ideas, getUser }}>
      {loading ? loadingMessage : children}
    </UserContext.Provider>
  );
}

export default UserContext;
export { UserContextProvider };
