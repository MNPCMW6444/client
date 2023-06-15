import { ChangeEvent, FormEvent, useContext, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import zxcvbn from "zxcvbn";
import UserContext from "../../context/UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate } from "react-router-dom";
import { LABELS, LablesConstants } from "./Login";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import styled from "@emotion/styled";
import MainserverContext from "../../context/MainserverContext";

export const StyledLinearProgressHOC = (passwordStrength: number) =>
  styled(LinearProgress)(() => {
    let x = "";
    switch (passwordStrength) {
      case 0:
        break;
      case 1:
        x = "red";
        break;
      case 2:
        x = "orange";
        break;
      case 3:
        x = "yellow";
        break;
      case 4:
        x = "green";
        break;
      default:
        x = "gray";
        break;
    }
    return {
      height: 10,
      borderRadius: 5,
      [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: x,
      },
    };
  });

const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [key, setKey] = useState<string>("");
  const [check, setCheck] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [buttonLabel, setButtonLabel] = useState<keyof LablesConstants>("IDLE");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const { refreshUserData } = useContext(UserContext);

  const [passwordStrength, setPasswordStrength] = useState<number>(0);

  const { axiosInstance } = useContext(MainserverContext);

  const navigate = useNavigate();

  const useQuery = () => new URLSearchParams(useLocation().search);
  let query = useQuery();

  useEffect(() => {
    setKey(query.get("key") || "");
  }, [query]);

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrength(zxcvbn(newPassword).score);
  };

  const validateEmail = (email: string) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!key) {
      axiosInstance.post("auth/signupreq", { email });
      setCheck(true);
    } else {
      if (
        password.length >= 6 &&
        name.length > 0 &&
        password === confirmPassword
      ) {
        axiosInstance
          .post("auth/signupfin", {
            key,
            fullname: name,
            password,
            passwordagain: confirmPassword,
          })
          .then(() => refreshUserData())
          .catch((error) => {
            setButtonLabel("IDLE");
            toast.error(
              error?.response?.data?.clientError ||
                error?.message ||
                "Unknown error, Make sure you are Online"
            );
          });
        setButtonLabel("DOING");
      }
    }
  };

  const StyledLinearProgress = StyledLinearProgressHOC(passwordStrength);

  return (
    <Box width="100%" height="100%" bgcolor="black">
      <ToastContainer />
      <Dialog open={true} onClose={() => {}}>
        <DialogTitle>Register</DialogTitle>
        <DialogContent>
          {!check && key && (
            <TextField
              autoFocus
              margin="dense"
              label="Name"
              type="text"
              fullWidth
              variant="outlined"
              value={name}
              error={name.length === 0}
              helperText={name.length === 0 ? "Name is required" : ""}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          {!check && !key && (
            <TextField
              autoFocus
              data-testid="email"
              margin="dense"
              label="Email Address"
              type="email"
              fullWidth
              variant="outlined"
              value={email}
              error={!validateEmail(email)}
              helperText={!validateEmail(email) ? "Invalid email" : ""}
              onChange={(e) => setEmail(e.target.value)}
            />
          )}
          {!check && key && (
            <TextField
              margin="dense"
              data-testid="password"
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              value={password}
              onChange={handlePasswordChange}
              error={passwordStrength < 3}
              helperText={
                passwordStrength < 3
                  ? "Password Strength has to be at least Yellow"
                  : ""
              }
            />
          )}
          {!check && key && (
            <Box my={1}>
              <StyledLinearProgress
                value={passwordStrength * 25}
                variant="determinate"
              />
            </Box>
          )}
          {!check && key && (
            <>
              <TextField
                margin="dense"
                label="Confirm Password"
                type="password"
                fullWidth
                variant="outlined"
                value={confirmPassword}
                error={password !== confirmPassword}
                helperText={
                  password !== confirmPassword ? "Passwords do not match" : ""
                }
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </>
          )}
          {!check ? (
            <>
              <Box mt={2}>
                <Button
                  type="submit"
                  data-testid="login-button"
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleSubmit}
                >
                  {LABELS[buttonLabel].REGISTER}
                </Button>
              </Box>

              <Box mt={1}>
                <Typography align="center">
                  Already have an account?
                  <Button color="primary" onClick={() => navigate("/login")}>
                    Login here
                  </Button>
                </Typography>
              </Box>
            </>
          ) : (
            <Typography align="center">
              Check you email inbox for a verification email with your url
            </Typography>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Register;
