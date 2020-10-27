import { createStore, applyMiddleware } from "redux";
import reducers from "~/reducers";
import ReduxPromise from "redux-promise";
import thunk from "redux-thunk";

// const store = () => {
//   const create = applyMiddleware(ReduxPromise)(createStore);
//   return create(reducers);
// };

// const store = createStore(reducers, applyMiddleware(thunk));

// export default store;

export default function configureStore() {
  return createStore(reducers, applyMiddleware(thunk));
}
