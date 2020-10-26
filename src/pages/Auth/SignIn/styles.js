import styled from "styled-components";
import { makeStyles } from "@material-ui/core";

export const Container = styled.div``;

const useStyles = makeStyles(theme => ({
  flexGrow: {
    flexGrow: 1
  },
  container: {
    padding: 0
  },
  loginContainer: {
    background:
      "linear-gradient(0deg, rgba(73, 240, 223, 0.65), rgba(43, 69, 78, 0.60))"
  },
  box: {
    display: "flex",
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    height: `auto`,
    minHeight: `100vh`
  },
  gridImage: {
    display: "flex",
    justifyContent: "center",
    alignSelf: "center"
  },
  gridTextFields: {
    display: "flex",
    justifyContent: "center",
    alignSelf: "center",
    flexDirection: "column",
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4)
  },
  textField: {
    paddingBottom: theme.spacing(2)
  },
  gridForgotPassword: {
    textAlign: "end",
    alignSelf: "center"
  },
  paddingTop1_5: {
    marginTop: theme.spacing(1.5)
  },
  paddingTop2_5: {
    marginTop: theme.spacing(2.5)
  },
  checkboxForgotPass: {
    paddingLeft: 0
  },
  image: {
    width: `85%`,
    height: `auto`
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
