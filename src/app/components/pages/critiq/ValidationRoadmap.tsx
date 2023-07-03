import React from "react";
import { StyledTypography as Typography } from "../../../../content/style/styled-components/all";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../../../content/style/whiteTheme"; // Replace with the path to your custom theme file

const Container = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const ValidationRoadmap = () => {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Typography variant="h2">Market Validation</Typography>
        <Container>
          <Typography variant="body1">
            Placeholder text for market validation step
          </Typography>
          <input type="checkbox" />
        </Container>
        <hr />
        <Typography variant="h2">Product Validation</Typography>
        <Container>
          <Typography variant="body1">
            Placeholder text for product validation step
          </Typography>
          <input type="checkbox" />
        </Container>
        <hr />
        <Typography variant="h2">Scientific Validation</Typography>
        <Container>
          <Typography variant="body1">
            Placeholder text for scientific validation step
          </Typography>
          <input type="checkbox" />
        </Container>
        <hr />
        <Typography variant="h2">Customer Validation</Typography>
        <Container>
          <Typography variant="body1">
            Placeholder text for customer validation step
          </Typography>
          <input type="checkbox" />
        </Container>
        <hr />
      </div>
    </ThemeProvider>
  );
};

export default ValidationRoadmap;
