import {FC, useState, Dispatch, SetStateAction, useEffect} from "react";
import {TextField, Grid} from "@mui/material";
import {StandardTextFieldProps} from "@mui/material/TextField";

interface EditableTextFieldProps extends StandardTextFieldProps {
    onEditSave: () => Promise<void>;
    value: string;
    setter: Dispatch<SetStateAction<string>>;
}

const EditableTextField: FC<EditableTextFieldProps> = ({
                                                           onEditSave,
                                                           setter,
                                                           ...props
                                                       }) => {
    const isEditing = useState(false)[0];
    const [value, setValue] = useState<string>(props.value || "");
    /*
        const handleSave = () => {
            onEditSave();
            setIsEditing(false);
        };

        const handleCancel = () => {
            setValue(props.value || "");
            setIsEditing(false);
        };*/

    useEffect(() => {
        setter(value);
    }, [value, setter]);

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
            {/*
      <Grid item alignSelf="center">
        {!isEditing && (
          <Button
            color="secondary"
            variant="outlined"
            onClick={() => setIsEditing(true)}
          >
            Edit{` ${props.label}`}
          </Button>
        )}
        {isEditing && (
          <Stack direction="row" spacing={1}>
            <Button color="secondary" variant="contained" onClick={handleSave}>
              Save
            </Button>
            <Button color="secondary" variant="outlined" onClick={handleCancel}>
              Cancel
            </Button>
          </Stack>
        )}
      </Grid>
*/}
        </Grid>
    );
};

export default EditableTextField;
