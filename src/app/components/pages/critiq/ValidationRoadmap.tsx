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
  fontWeight: "bold",
});

const Title = styled("h1")({
  fontSize: "24px",
});

const ValidationRoadmap = () => {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Title>Validation Roadmap</Title>
        <Heading>Market Validation</Heading>
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
        <Heading>Product Validation</Heading>
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
        <Heading>Scientific Validation</Heading>
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
        <Heading>Customer Validation</Heading>
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
