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
import { WhiteModels } from "@failean/shared-types";
type WhiteUser = WhiteModels.Auth.WhiteUser;
type WhiteIdea = WhiteModels.Data.Ideas.WhiteIdea;

const loadingMessage = (
  <Typography>Loading user account details and ideas...</Typography>
);

const UserContext = createContext<{
  user?: WhiteUser;
  ideas: WhiteIdea[];
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
  const [ideas, setIdeas] = useState<WhiteIdea[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshUserData = useCallback(async () => {
    if (axiosInstance)
      axiosInstance
        .get("auth/signedin")
        .then((userRes) => {
          setUser(userRes.data);
          axiosInstance &&
            axiosInstance
              .get("data/ideas/getIdeas")
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
