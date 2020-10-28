import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import App from "~/App";
import { CssBaseline, ThemeProvider, createMuiTheme } from "@material-ui/core";
import { Provider } from "react-redux";
import store from "~/store";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: `#00705C`
    }
  }
});

ReactDOM.render(
  <Provider store={store()}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);
