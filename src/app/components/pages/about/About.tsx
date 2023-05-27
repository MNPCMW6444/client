import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import version from "../../../util/version";

const StyledBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontFamily: (theme as any).typography.fontFamily,
  color: theme.palette.text.primary,
}));

const About = () => {
  return (
    <StyledBox>
      <StyledTypography variant="h4" gutterBottom>
        About fAIler
      </StyledTypography>

      <StyledTypography variant="body1" paragraph>
        Client version: ${version}
      </StyledTypography>
    </StyledBox>
  );
};

export default About;
