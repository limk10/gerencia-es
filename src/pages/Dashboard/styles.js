import styled from "styled-components";
import { makeStyles } from "@material-ui/core";

export const Container = styled.div``;

const useStyles = makeStyles(theme => ({
  dividerApresentation: {
    borderBottom: `1.5px solid ${theme.palette.primary.main} !important`,
    width: `50%`
  },
  resumeBox: {
    marginTop: 20
  }
}));

export { useStyles };
