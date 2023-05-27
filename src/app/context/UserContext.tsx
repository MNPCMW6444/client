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
  ideas: any[];
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
  const [ideas, setIdeas] = useState<any[]>([]);
  const [lastRawIdea, setLastRawIdea] = useState<string>("");
  const axiosInstance = useContext(MainServerContext);
  const loadingMessage = <Typography>Loading lilush...</Typography>;
  const [loading, setloading] = useState(true);

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
      .post("data/rawIdeas", { idea: ideas[ideas.length - 1]?._id })
      .then((res) => {
        if (res.data.rawIdeas.length === 0)
          axiosInstance
            .post("data/saveRawIdea", {
              parent: ideas[ideas.length - 1]?._id,
              rawIdea: "enter your new idea here",
            })
            .then(() => {
              axiosInstance
                .post("data/rawIdeas", {
                  idea: ideas[ideas.length - 1]?._id,
                })
                .then(() => {
                  setLastRawIdea(
                    res.data.rawIdeas[res.data.rawIdeas.length - 1].rawIdea
                  );
                  setloading(false);
                });
            });
        else {
          setLastRawIdea(
            res.data.rawIdeas[res.data.rawIdeas.length - 1].rawIdea
          );
          setloading(false);
        }
      })
      .catch(() => setLastRawIdea(""));
  }, [ideas, axiosInstance]);

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
