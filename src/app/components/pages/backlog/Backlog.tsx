import {
  Grid,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";

const Backlog = () => {
  return (
    <Grid container direction="column" rowSpacing={10} alignItems="center">
      <Grid item>
        <Typography variant="h3">Idea Backlog:</Typography>
      </Grid>
      <Grid item>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Idea:</TableCell>
              <TableCell>asdasdasdasdasdasd</TableCell>
              <TableCell>asdasdasdasdasdasd</TableCell>
              <TableCell>asdasdasdasdasdasd</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>asdasdasdasdasdasd</TableCell>
              <TableCell>asdasdasdasdasdasd</TableCell>
              <TableCell>asdasdasdasdasdasd</TableCell>
              <TableCell>asdasdasdasdasdasd</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>asdasdasdasdasdasd</TableCell>
              <TableCell>asdasdasdasdasdasd</TableCell>
              <TableCell>asdasdasdasdasdasd</TableCell>
              <TableCell>asdasdasdasdasdasd</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Grid>
    </Grid>
  );
};

export default Backlog;
