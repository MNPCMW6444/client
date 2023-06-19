import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import version from "../../../util/version";
import { MainserverContext } from "@failean/mainserver-provider";
import { useContext } from "react";
import name from "../../../../content/name";

const StyledBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontFamily: (theme as any).typography.fontFamily,
  color: theme.palette.text.primary,
}));

const About = () => {
  const mainserverContext = useContext(MainserverContext);
  const serverVersion = mainserverContext?.version;
  return serverVersion ? (
    <StyledBox>
      <StyledTypography variant="h4" gutterBottom>
        About {name.up}
      </StyledTypography>
      <StyledTypography variant="body1" paragraph>
        Client version: ${version}
      </StyledTypography>
      <StyledTypography variant="body1" paragraph>
        Server version: ${serverVersion}
      </StyledTypography>
    </StyledBox>
  ) : (
    <></>
  );
};

export default About;
