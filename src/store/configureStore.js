import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import notesReducer from "../reducers/notesReducer";
import filtersReducer from "../reducers/filtersReducer";
import uiReducer from "../reducers/uiReducer";
import authReducer from "../reducers/authReducer";

const configureStore = () =>
  createStore(
    combineReducers({
      main: notesReducer,
      filters: filtersReducer,
      ui: uiReducer,
      auth: authReducer,
    }),
    applyMiddleware(thunk)
  );

export default configureStore;
