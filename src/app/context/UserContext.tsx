import {
  useState,
  useEffect,
  ReactNode,
  createContext,
  useCallback,
  useContext,
} from "react";
import { Typography } from "@mui/material";
import { MainserverContext } from "@failean/mainserver-provider";

const loadingMessage = (
  <Typography>Loading user account details and ideas...</Typography>
);

interface Idea {
  prompts: any;
  name: ReactNode;
  _id: string;
  idea: string;
}

const UserContext = createContext<{
  user: any;
  ideas: Idea[];
  refreshUserData: () => Promise<void>;
}>({
  user: undefined,
  ideas: [],
  refreshUserData: () => Promise.resolve(),
});

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const mainserverContext = useContext(MainserverContext);
  const axiosInstance = mainserverContext?.axiosInstance;
  const [user, setUser] = useState(undefined);
  const [ideas, setIdeas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshUserData = useCallback(async () => {
    if (axiosInstance)
      axiosInstance
        .get("auth/signedin")
        .then((userRes) => {
          setUser(userRes.data);
          axiosInstance &&
            axiosInstance
              .get("data/getIdeas")
              .then((res) => {
                setIdeas(res.data.ideas);
                setLoading(false);
              })
              .catch(() => {
                setIdeas([]);
                setLoading(false);
              });
        })
        .catch(() => {
          setUser(undefined);
          setLoading(false);
        });
  }, [axiosInstance]);

  useEffect(() => {
    refreshUserData();
  }, [refreshUserData]);

  return (
    <UserContext.Provider
      value={{
        user,
        ideas,
        refreshUserData,
      }}
    >
      {loading ? loadingMessage : children}
    </UserContext.Provider>
  );
};

export default UserContext;
