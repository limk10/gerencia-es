import styled from "styled-components";
import { makeStyles } from "@material-ui/core";

export const Container = styled.div``;

const useStyles = makeStyles(theme => ({
  appbar: {
    background:
      "linear-gradient(90deg, rgba(0,111,95, 0.90), rgba(0,111,95, 0.70))",
    boxShadow: "none",
    zIndex: theme.zIndex.drawer + 1
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    fontWeight: 500,
    fontSize: 23,
    cursor: `pointer`
  },
  iconsMenuItem: {
    paddingLeft: 4
  }
}));

export { useStyles };
