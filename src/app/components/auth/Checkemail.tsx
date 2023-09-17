import {Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {ToastContainer} from "react-toastify";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";

const Checkemail = () => {
    return (
        <Box width="100%" height="100%" bgcolor="black">
            <ToastContainer/>
            <Dialog open={true} onClose={() => {
            }}>
                <DialogTitle>Register</DialogTitle>
                <DialogContent>
                    <Typography>
                        Check your email , you will receive a link to use failean!
                    </Typography>
                </DialogContent>
            </Dialog>
        </Box>

    );
};

export default Checkemail;
