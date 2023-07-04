import React from "react";
import { StyledTypography } from "../../../../content/style/styled-components/all";
import { styled } from "@mui/system";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../../../content/style/whiteTheme"; // Replace with the path to your custom theme file

const Container = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const Table = styled("table")({
  width: "100%",
  borderCollapse: "collapse",
  borderRadius: "1rem",
});
const TableCell = styled("td")({
  padding: "1rem",
  borderBottom: "1px solid #ccc",
});

const Heading = styled("h2")({
  fontSize: "18px",
  variant: "body1",
});

const ValidationRoadmap = () => {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <StyledTypography variant="h1">Validation Roadmap</StyledTypography>
        <StyledTypography variant="h2">Market Validation</StyledTypography>
        <Table>
          <tbody>
            <tr>
              <TableCell>Task</TableCell>
              <TableCell>Information</TableCell>
              <TableCell>Urgency</TableCell>
              <TableCell>Status</TableCell>
            </tr>
            <tr>
              <TableCell>Market Validation</TableCell>
              <TableCell>Placeholder text for market validation step</TableCell>
              <TableCell>High</TableCell>
              <TableCell>In Progress</TableCell>
            </tr>
          </tbody>
        </Table>
        <hr />
        <StyledTypography variant="h2">Product Validation</StyledTypography>
        <Table>
          <tbody>
            <tr>
              <TableCell>Task</TableCell>
              <TableCell>Information</TableCell>
              <TableCell>Urgency</TableCell>
              <TableCell>Status</TableCell>
            </tr>
            <tr>
              <TableCell>Product Validation</TableCell>
              <TableCell>Placeholder text for product validation step</TableCell>
              <TableCell>Medium</TableCell>
              <TableCell>To Do</TableCell>
            </tr>
          </tbody>
        </Table>
        <hr />
        <StyledTypography variant="h2">Scientific Validation</StyledTypography>
        <Table>
          <tbody>
            <tr>
              <TableCell>Task</TableCell>
              <TableCell>Information</TableCell>
              <TableCell>Urgency</TableCell>
              <TableCell>Status</TableCell>
            </tr>
            <tr>
              <TableCell>Scientific Validation</TableCell>
              <TableCell>Placeholder text for scientific validation step</TableCell>
              <TableCell>Low</TableCell>
              <TableCell>To Do</TableCell>
            </tr>
          </tbody>
        </Table>
        <hr />
        <StyledTypography variant="h2">Customer Validation</StyledTypography>
        <Table>
          <tbody>
            <tr>
              <TableCell>Task</TableCell>
              <TableCell>Information</TableCell>
              <TableCell>Urgency</TableCell>
              <TableCell>Status</TableCell>
            </tr>
            <tr>
              <TableCell>Customer Validation</TableCell>
              <TableCell>Placeholder text for customer validation step</TableCell>
              <TableCell>High</TableCell>
              <TableCell>To Do</TableCell>
            </tr>
          </tbody>
        </Table>
        <hr />
      </div>
    </ThemeProvider>
  );
};

export default ValidationRoadmap;
