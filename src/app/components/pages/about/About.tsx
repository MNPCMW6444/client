import { Box, Typography, Link } from "@mui/material";
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

const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: "none",
}));

const About = () => {
  return (
    <StyledBox>
      <StyledTypography variant="h4" gutterBottom>
        About Failer
      </StyledTypography>

      <StyledTypography variant="body1" paragraph>
        Client version: ${version}
      </StyledTypography>
    </StyledBox>
  );
};

export default About;
