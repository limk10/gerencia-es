import React, { Fragment, useEffect } from "react";
import { Provider } from "react-redux";
import Routes from "~/routes";
import GlobalStyle from "~/assets/css/global";
import store from "~/store";
import TopBar from "~/containers/Topbar";
import Drawer from "~/containers/DrawerApp";
import { isAuthenticated } from "~/services/auth";
import { Box, makeStyles, Toolbar, Hidden, Zoom } from "@material-ui/core";
import { BrowserRouter } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  content: {
    flexGrow: 1,
    paddingLeft: theme.spacing(1)
  }
}));

const App = () => {
  const classes = useStyles();
  return (
    <Provider store={store}>
      <GlobalStyle />
      <BrowserRouter>
        {isAuthenticated() && (
          <div className={classes.root}>
            <TopBar />
            <Hidden smDown>
              <Drawer />
            </Hidden>
            <main className={classes.content}>
              <Box p={3}>
                <Toolbar />
                <Routes />
              </Box>
            </main>
          </div>
        )}
        {!isAuthenticated() && <Routes />}
      </BrowserRouter>
    </Provider>
  );
};

export default App;
