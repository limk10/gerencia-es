import React, { useState } from "react";
import { useStyles } from "./styles";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem
} from "@material-ui/core";
import { ExitToApp, PersonOutline, AccountCircle } from "@material-ui/icons";
import { logout } from "~/services/auth";
import { useHistory } from "react-router-dom";
import MonetizationOnOutlinedIcon from "@material-ui/icons/MonetizationOnOutlined";

function Topbar() {
  const history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

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

  return (
    <>
      <AppBar position="fixed" className={classes.appbar}>
        <Toolbar>
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
              <MenuItem onClick={handleClose}>
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
