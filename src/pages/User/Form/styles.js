import styled from "styled-components";
import { makeStyles } from "@material-ui/core";

export const Container = styled.div``;

const useStyles = makeStyles(theme => ({
  textField: {
    width: `100%`,
    marginTop: 12,
    paddingLeft: 5,
    paddingRight: 5
  },
  gridButtons: {
    textAlign: "end",
    padding: 3
  },
  gridSwitch: {
    display: "flex",
    alignSelf: "center",
    justifyContent: "center"
  },
  buttonBack: {
    marginRight: 5
  },
  dividerForm: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2)
  },
  textUserPass: {
    margin: 0
  },
  textFieldPass: {
    marginTop: 10,
    width: "100%"
  },
  switchActive: {
    marginTop: 12
  },
  buttonProgress: {
    color: "green",
    position: "absolute",
    top: "60%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  },
  wrapper: {
    position: "relative"
  }
}));

export { useStyles };
