import React, { useEffect } from "react";
import { useStyles } from "./styles";
import {
  Drawer,
  Toolbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from "@material-ui/core";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import { useHistory } from "react-router-dom";
import PersonOutlineTwoToneIcon from "@material-ui/icons/PersonOutlineTwoTone";
import MeetingRoomTwoToneIcon from "@material-ui/icons/MeetingRoomTwoTone";
import HomeTwoToneIcon from "@material-ui/icons/HomeTwoTone";
import AttachMoneyTwoToneIcon from "@material-ui/icons/AttachMoneyTwoTone";
import { logout } from "~/services/auth";

const DrawerApp = () => {
  const classes = useStyles();
  let history = useHistory();

  const navigateTo = route => {
    history.push(route);
  };

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <Toolbar />
      <div className={classes.drawerContainer}>
        <List>
          <ListItem onClick={() => navigateTo("/")} button key={1}>
            <ListItemIcon>
              <HomeTwoToneIcon />
            </ListItemIcon>
            <ListItemText primary={"Home"} />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem onClick={() => navigateTo("/user")} button key={1}>
            <ListItemIcon>
              <PersonOutlineTwoToneIcon />
            </ListItemIcon>
            <ListItemText primary={"Cliente"} />
          </ListItem>
          <ListItem onClick={() => navigateTo("/financeiro")} button key={1}>
            <ListItemIcon>
              <AttachMoneyTwoToneIcon />
            </ListItemIcon>
            <ListItemText primary={"Financeiro"} />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem onClick={() => logout()} button key={1}>
            <ListItemIcon>
              <MeetingRoomTwoToneIcon />
            </ListItemIcon>
            <ListItemText primary={"Sair"} />
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
};

export default DrawerApp;
