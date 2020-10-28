import styled from "styled-components";
import { makeStyles } from "@material-ui/core";

export const Container = styled.div``;

const useStyles = makeStyles(theme => ({
  gridButtons: {
    textAlign: "end"
  },
  textField: {
    width: `100%`,
    marginTop: 12,
    paddingLeft: 5,
    paddingRight: 5
  },
  switchActive: {
    marginTop: 12
  },
  gridSwitch: {
    display: "flex",
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 20
  },
  cardFilter: {
    marginBottom: 10
  },
  gridHeader: {
    marginBottom: 10
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    marginTop: 12
  },
  dividerForm: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2)
  },
  gridPassword: {
    textAlign: "center"
  }
}));

export { useStyles };
