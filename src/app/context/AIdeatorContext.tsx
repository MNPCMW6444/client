import {
  useState,
  useEffect,
  ReactNode,
  createContext,
  useCallback,
  useContext,
} from "react";
import { MainserverContext } from "@failean/mainserver-provider";
import { Typography } from "@mui/material";
import { styled } from "@mui/system";
import { PromptGraph } from "@failean/shared-types";

const WhiteTypography = styled(Typography)(({ theme }) => ({
  fontFamily: "Monospace",
  fontWeight: "bold",
  fontSize: 32,
  letterSpacing: 2,
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(1),
}));

const loadingMessage = (
  <WhiteTypography>Loading promt result...</WhiteTypography>
);

const UserContext = createContext<{
  graph: PromptGraph;
  refreshGraph: () => Promise<void>;
}>({
  graph: [],
  refreshGraph: () => Promise.resolve(),
});

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const mainserverContext = useContext(MainserverContext);
  const axiosInstance = mainserverContext?.axiosInstance;
  const [graph, setGraph] = useState([]);
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
