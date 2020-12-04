import { createStore, combineReducers } from "redux";
import notesReducer from "../reducers/notesReducer";
import filtersReducer from "../reducers/filtersReducer";
import uiReducer from "../reducers/uiReducer";

const configureStore = () => createStore(combineReducers({
    main: notesReducer,
    filters: filtersReducer,
    ui: uiReducer,
}));

export default configureStore;