import actionsTypes from "./actionsTypes";

export default {
  drawerApp: value => {
    return {
      type: actionsTypes.DRAWER,
      payload: value
    };
  }
};
