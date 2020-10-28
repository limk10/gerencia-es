import React, { useState, Fragment, useEffect } from "react";
import Routes from "~/routes";
import GlobalStyle from "~/assets/css/global";
import TopBar from "~/containers/Topbar";
import Drawer from "~/containers/DrawerApp";
import { isAuthenticated } from "~/services/auth";
import {
  Box,
  makeStyles,
  Toolbar,
  Fade,
  Grow,
  Hidden
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { BrowserRouter } from "react-router-dom";
import { useSelector } from "react-redux";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  content: {
    flexGrow: 1
  }
}));

const App = () => {
  const theme = useTheme();
  const open = useSelector(state => state.reducerDrawer.drawerApp);
  const classes = useStyles();

  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        {isAuthenticated() && (
          <div className={classes.root}>
            <TopBar />
            {open && <Drawer />}
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
    </>
  );
};

export default App;
