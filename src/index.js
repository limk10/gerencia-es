import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import App from "~/App";
import { CssBaseline, ThemeProvider, createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: `#00705C`
    }
  }
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);
