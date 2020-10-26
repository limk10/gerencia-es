import React from "react";
import { Typography } from "@material-ui/core";
import { Container } from "./styles";

function NotFound() {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Pagina não encontrada :(
      </Typography>
    </Container>
  );
}

export default NotFound;
