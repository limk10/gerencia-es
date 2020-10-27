import { createStore, applyMiddleware } from "redux";
import reducers from "~/reducers";
import ReduxPromise from "redux-promise";
import thunk from "redux-thunk";

const store = () => {
  const create = applyMiddleware(thunk)(createStore);
  return create(reducers);
};

// const store = createStore(reducers, applyMiddleware(thunk));

export default store;
