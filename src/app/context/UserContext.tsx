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

import { WhiteModels } from "@failean/shared-types";
type WhiteUser = WhiteModels.Auth.WhiteUser;
type WhiteIdea = WhiteModels.Data.Ideas.WhiteIdea;

const WhiteTypography = styled(Typography)(({ theme }) => ({
  fontFamily: "Monospace",
  fontWeight: "bold",
  fontSize: 32,
  letterSpacing: 2,
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(1),
}));

const loadingMessage = (
  <WhiteTypography>Loading user account details and ideas...</WhiteTypography>
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
              .then(async (res) => {
                setIdeas(
                  (
                    await Promise.all(
                      res.data.ideas.map(async (idea: WhiteIdea) => ({
                        data: (
                          await axiosInstance.post(
                            "data/prompts/getPromptResult",
                            {
                              ideaID: idea._id,
                              promptName: "ideaName",
                            }
                          )
                        ).data,
                        original: idea.idea,
                        idea,
                      }))
                    )
                  ).map(({ data, original, idea }) => ({
                    ...idea,
                    idea: data.promptResult ? data.promptResult.data : original,
                  }))
                );
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
