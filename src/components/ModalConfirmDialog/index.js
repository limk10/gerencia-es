import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  DialogContentText
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import actionsModals from "~/actions/modals";

function ConfirmDialog(params) {
  const dispatch = useDispatch();
  const open = useSelector(state => state.reducerModals.modalConfirmDialog);

  const {
    title = "Confirm Dialog",
    content = "Conteúdo Exemplo",
    titleButtonConfirm = "Confirmar",
    titleButtonCancel = "Cancelar",
    actionCancel = {},
    actionConfirm = {}
  } = params;

  const handleClose = () => {
    dispatch(actionsModals.modalConfirmDialog(false));
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      // PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
    >
      <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={() => handleClose()} color="primary">
          {titleButtonCancel}
        </Button>
        <Button onClick={() => actionConfirm()} color="primary">
          {titleButtonConfirm}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDialog;
