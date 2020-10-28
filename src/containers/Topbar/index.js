import React, { useState } from "react";
import { useStyles } from "./styles";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Hidden
} from "@material-ui/core";
import { ExitToApp, PersonOutline, AccountCircle } from "@material-ui/icons";
import { logout } from "~/services/auth";
import { useHistory } from "react-router-dom";
import MonetizationOnOutlinedIcon from "@material-ui/icons/MonetizationOnOutlined";
import MenuIcon from "@material-ui/icons/Menu";
import { useDispatch, useSelector } from "react-redux";
import actionDrawer from "~/actions/drawer";

function Topbar() {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const openDrawer = useSelector(state => state.reducerDrawer.drawerApp);
  const [anchorEl, setAnchorEl] = useState(null);

  const user = localStorage.getItem("gerencia-es.user");
  const parsedUser = JSON.parse(user);

  const open = Boolean(anchorEl);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const makeLogout = async () => {
    await logout();
  };

  const navigateTo = route => {
    handleClose();
    history.push(route);
  };

  return (
    <>
      <AppBar position="fixed" className={classes.appbar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => dispatch(actionDrawer.drawerApp(!openDrawer))}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
          <Typography
            onClick={() => history.push("/")}
            variant="h6"
            className={classes.title}
          >
            Gerencia ES
            <MonetizationOnOutlinedIcon fontSize="small" />
          </Typography>

          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle fontSize="large" />
              {
                <Hidden smDown>
                  <Typography
                    style={{ marginLeft: 10, marginTop: 8 }}
                    variant="body1"
                    gutterBottom
                  >
                    {parsedUser?.firstname} {parsedUser?.lastname}
                  </Typography>
                </Hidden>
              }
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={() => navigateTo("/perfil")}>
                Perfil <PersonOutline className={classes.iconsMenuItem} />
              </MenuItem>
              <MenuItem onClick={() => makeLogout()}>
                Logout
                <ExitToApp className={classes.iconsMenuItem} />
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Topbar;
