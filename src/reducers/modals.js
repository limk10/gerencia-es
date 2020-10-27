import actionsTypes from "~/actions/actionsTypes";

const INITIAL_STATE = {};

const reducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionsTypes.MODAL_CONFIRM_DIALOG:
      return { ...state, modalConfirmDialog: action.payload };

    default:
      return state;
  }
};

export { reducers };
