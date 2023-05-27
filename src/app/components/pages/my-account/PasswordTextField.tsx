import { FC, useState, Dispatch, SetStateAction, useEffect } from "react";
import { TextField, Button, Stack, Grid } from "@mui/material";
import { StandardTextFieldProps } from "@mui/material/TextField";
import zxcvbn from "zxcvbn";
import { StyledLinearProgressHOC } from "../../auth/Register";

interface PasswordTextFieldProps extends StandardTextFieldProps {
  onEditSave: () => Promise<void>;
  value: string;
  value2: string;
  setter: Dispatch<SetStateAction<string>>;
  setter2: Dispatch<SetStateAction<string>>;
}

const PasswordTextField: FC<PasswordTextFieldProps> = ({
  onEditSave,
  setter,
  setter2,
  ...props
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState<string>(props.value || "");
  const [value2, setValue2] = useState<string>(props.value2 || "");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<number>(0);

  const StyledLinearProgress = StyledLinearProgressHOC(passwordStrength);

  useEffect(() => {
    setPasswordStrength(zxcvbn(value).score);
  }, [value]);

  const handleSave = () => {
    onEditSave();
    setIsEditing(false);
  };

  const handleCancel = () => {
    setValue(props.value || "");
    setIsEditing(false);
  };

  useEffect(() => {
    setter(value);
  }, [value, setter]);

  useEffect(() => {
    setter2(value2);
  }, [value2, setter2]);

  useEffect(() => {
    setIsPasswordValid(!!(value && value2 && value === value2));
  }, [value, value2]);

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <TextField
          {...props}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          InputProps={{
            ...props.InputProps,
            readOnly: !isEditing,
          }}
        />
      </Grid>
      {isEditing && (
        <Grid item>
          <StyledLinearProgress
            value={passwordStrength * 25}
            variant="determinate"
          />
        </Grid>
      )}
      {isEditing && (
        <Grid item>
          <TextField
            label="Confirm Password"
            type="password"
            value={value2}
            onChange={(e: any) => setValue2(e.target.value)}
            error={!isPasswordValid}
            helperText={!isPasswordValid && "Passwords do not match"}
            fullWidth
          />
        </Grid>
      )}
      <Grid item alignSelf="center">
        {!isEditing && (
          <Button variant="outlined" onClick={() => setIsEditing(true)}>
            Edit{` ${props.label}`}
          </Button>
        )}
        {isEditing && (
          <Stack direction="row" spacing={1}>
            <Button variant="contained" onClick={handleSave}>
              Save
            </Button>
            <Button variant="outlined" onClick={handleCancel}>
              Cancel
            </Button>
          </Stack>
        )}
      </Grid>
    </Grid>
  );
};

export default PasswordTextField;
