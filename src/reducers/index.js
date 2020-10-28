import { combineReducers } from "redux";
import reducerModals from "./modals";
import reducerDrawer from "./drawer";

const reducers = combineReducers({
  reducerModals,
  reducerDrawer
});

export default reducers;
