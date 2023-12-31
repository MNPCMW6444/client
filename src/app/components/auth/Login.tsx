import {
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  useContext,
  useState,
} from "react";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import UserContext from "../../context/UserContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { MainserverContext } from "@failean/mainserver-provider";

export interface LablesConstants {
  IDLE: {
    LOGIN: string;
    REGISTER: string;
    RESET: string;
  };
  DOING: {
    LOGIN: string;
    REGISTER: string;
    RESET: string;
  };
}

export const LABELS: LablesConstants = {
  IDLE: { LOGIN: "Login", REGISTER: "Register", RESET: "Reset" },
  DOING: {
    LOGIN: "Logging in...",
    REGISTER: "Registering...",
    RESET: "Resetting...",
  },
};

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [buttonLabel, setButtonLabel] = useState<keyof LablesConstants>("IDLE");
  const { refreshUserData } = useContext(UserContext);

  const navigate = useNavigate();

  const mainserverContext = useContext(MainserverContext);
  const axiosInstance = mainserverContext?.axiosInstance;

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit(e as unknown as FormEvent);
    }
  };

  const validateEmail = (email: string) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateEmail(email) && password) {
      if (axiosInstance) {
        axiosInstance
          .post("auth/signin", { email, password })
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

  return (
    <Box width="100%" height="100%" bgcolor="black">
      <Dialog open={true} onClose={() => {}}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
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

          <TextField
            margin="dense"
            data-testid="password"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            value={password}
            onChange={handlePasswordChange}
            onKeyPress={handleKeyPress} // Add this line
          />
          <Box mt={2}>
            <Button
              color="secondary"
              type="submit"
              data-testid="login-button"
              variant="contained"
              fullWidth
              onClick={handleSubmit}
            >
              {LABELS[buttonLabel].LOGIN}
            </Button>
          </Box>
          <Box mt={1}>
            <Typography align="center">
              Don't have an account?
              <Button color="secondary" onClick={() => navigate("/register")}>
                Register here
              </Button>
            </Typography>
            <Typography align="center">
              Forgot you password?
              <Button color="secondary" onClick={() => navigate("/reset")}>
                Reset here
              </Button>
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Login;
