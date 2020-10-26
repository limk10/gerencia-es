import React from "react";
import { Grid, Typography } from "@material-ui/core";

import { Container } from "./styles";

function Dashboard() {
  return (
    <Container>
      <Grid container>
        <Grid item xs={6}>
          <Typography variant="h4" gutterBottom>
            Dashboard
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;
