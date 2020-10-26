import styled from "styled-components";
import { makeStyles } from "@material-ui/core";

export const Container = styled.div``;

const useStyles = makeStyles(theme => ({
  gridButtons: {
    textAlign: "end"
  }
}));

export { useStyles };
