import actionsTypes from "./actionsTypes";

export default {
  modalConfirmDialog: value => {
    return {
      type: actionsTypes.MODAL_CONFIRM_DIALOG,
      payload: value
    };
  }
};
