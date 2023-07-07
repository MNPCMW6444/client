import { FC, useState, useEffect, useContext } from "react";
import { Container, TextField, Typography, Grid, Paper } from "@mui/material";
import { toast } from "react-toastify";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import EditableTextField from "./EditableTextField";
import PasswordTextField from "./PasswordTextField";
import styled from "@emotion/styled";
import UserContext from "../../../context/UserContext";
import { MainserverContext } from "@failean/mainserver-provider";

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: ${(props: any) =>
    props.theme.spacing instanceof Function ? props.theme.spacing(32) : 32}px;
  min-height: 100vh;
`;

const StyledTypography = styled(Typography)`
  color: #ffffff;
`;

const StyledPaper = styled(Paper)`
  padding: ${(props: any) =>
    props.theme.spacing instanceof Function ? props.theme.spacing(4) : 4}px;
  width: 100%;
`;

export const StyledTextField: any = styled(TextField)`
  width: 100%;
  margin-bottom: ${(props: any) =>
    props.theme.spacing instanceof Function ? props.theme.spacing(2) : 2}px;
`;

const MyAccount: FC = () => {
  const { user, refreshUserData } = useContext(UserContext);
  const [name, setName] = useState(user?.name || "");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const setIsEditingNamex = useState(false);
  const setIsEditingName = setIsEditingNamex[1];
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  const [tokenBalance, setTokenBalance] = useState<number>(0);

  const mainserverContext = useContext(MainserverContext);
  const axiosInstance = mainserverContext?.axiosInstance;

  useEffect(() => {
    refreshUserData();
    const fetchTokens = async () => {
      try {
        if (axiosInstance) {
          const res = await axiosInstance.get("accounts/countTokens");
          setTokenBalance(res.data.tokens);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchTokens();
  }, [refreshUserData, axiosInstance]);

  useEffect(() => {
    user && setName(user.name);
  }, [user]);

  const handleUpdateName = async () => {
    try {
      if (axiosInstance) {
        axiosInstance.post(
          "auth/updatename",
          { name },
          { withCredentials: true }
        );
        setIsEditingName(false);

        toast.error("Name updated successfully!");
        refreshUserData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdatePassword = async () => {
    try {
      if (axiosInstance) {
        axiosInstance.post(
          "auth/updatepassword",
          { password },
          { withCredentials: true }
        );
        setIsEditingPassword(false);
        toast.error("Password updated successfully!");
        refreshUserData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <StyledContainer maxWidth="xs">
      <StyledTypography variant="h4" gutterBottom>
        Account Management
      </StyledTypography>
      <StyledPaper elevation={3}>
        <Grid container direction="column" spacing={2} padding={2}>
          <Grid item>
            <EditableTextField
              InputLabelProps={{
                shrink: user?.name ? true : undefined,
              }}
              label="Name"
              value={name || ""}
              onEditSave={handleUpdateName}
              setter={setName}
              InputProps={{
                startAdornment: <AccountCircleIcon />,
              }}
              fullWidth
            />
          </Grid>
          <Grid item>
            <StyledTextField
              InputLabelProps={{
                shrink: user?.email ? true : undefined,
              }}
              label="Email"
              value={user?.email || ""}
              InputProps={{
                readOnly: true,
                startAdornment: <EmailIcon />,
              }}
              fullWidth
              dsiabled
            />
          </Grid>
          <Grid item>
            <PasswordTextField
              InputLabelProps={{
                shrink: true,
              }}
              label="Password"
              value={password || ""}
              value2={repeatPassword}
              type="password"
              InputProps={{
                readOnly: !isEditingPassword,
                startAdornment: <LockIcon />,
              }}
              fullWidth
              onEditSave={handleUpdatePassword}
              setter={setPassword}
              setter2={setRepeatPassword}
            />
          </Grid>
          <Grid item alignSelf="center">
            <Typography variant="h6" gutterBottom>
              Token Balance: {tokenBalance}
            </Typography>
          </Grid>
        </Grid>
      </StyledPaper>
    </StyledContainer>
  );
};

export default MyAccount;
