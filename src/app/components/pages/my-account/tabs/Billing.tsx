import React, {FC, useEffect, useContext} from "react";
import {
    Container,
    Typography,
    Grid,
    Paper,
    Button,
} from "@mui/material";
import styled from "@emotion/styled";
import UserContext from "../../../../context/UserContext";
import {MainserverContext} from "@failean/mainserver-provider";
import Link from "@mui/material/Link";
import capitalize from "../../../../util/capitalize";

export const StyledContainer = styled(Container)`
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


const Billing: FC = () => {
    const {
        user,
        refreshUserData,
        tokens: tokenBalance,
    } = useContext(UserContext);

    const mainserverContext = useContext(MainserverContext);
    const axiosInstance = mainserverContext?.axiosInstance;

    useEffect(() => {
        refreshUserData();
    }, [refreshUserData, axiosInstance]);


    return (
        <StyledContainer maxWidth="xs">
            <StyledTypography variant="h4" gutterBottom>
                Account Management
            </StyledTypography>
            <StyledPaper elevation={3}>
                <Grid container direction="column" spacing={2} padding={2}>

                    <Grid item alignSelf="center">
                        <Typography variant="h6" gutterBottom>
                            Subscription: {capitalize(user?.subscription || "free")}
                        </Typography>
                    </Grid>
                    <Grid item alignSelf="center">
                        <Typography variant="h6" gutterBottom>
                            Token Balance: {tokenBalance}
                        </Typography>
                    </Grid>
                    {user?.email && (
                        <>
                            <Grid item alignSelf="center">
                                <Typography variant="h5">Need more Tokens?</Typography>
                            </Grid>
                            <Grid item alignSelf="center">
                                <Button variant="contained">
                                    <Link color="#ffffff" href={"/tok"}>
                                        Buy more here
                                    </Link>
                                </Button>
                            </Grid>
                            <Grid item alignSelf="center">
                                <Typography variant="h5">Or Even Better:</Typography>
                            </Grid>
                            <Grid item alignSelf="center">
                                <Button variant="contained">
                                    <Link color="#ffffff" href={"/sub"}>
                                        Subscribe and save
                                    </Link>
                                </Button>
                            </Grid>
                        </>
                    )}
                </Grid>
            </StyledPaper>
        </StyledContainer>
    );
};

export default Billing;
