import { createStore, applyMiddleware } from "redux";
import reducers from "~/reducers";
import ReduxPromise from "redux-promise";
import thunk from "redux-thunk";

const store = () => {
  const create = applyMiddleware(thunk)(createStore);
  return create(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
};

// const store = createStore(reducers, applyMiddleware(thunk));

export default store;
