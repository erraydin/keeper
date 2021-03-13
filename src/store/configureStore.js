import { createStore, combineReducers, applyMiddleware } from "redux";
import notesReducer from "../reducers/notesReducer";
import filtersReducer from "../reducers/filtersReducer";
import uiReducer from "../reducers/uiReducer";
import thunk from "redux-thunk";

const configureStore = () =>
  createStore(
    combineReducers({
      main: notesReducer,
      filters: filtersReducer,
      ui: uiReducer,
    }),
    applyMiddleware(thunk)
  );

export default configureStore;
