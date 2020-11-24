import { createStore, combineReducers } from "redux";
import notesReducer from "../reducers/notesReducer";
import filtersReducer from "../reducers/filtersReducer";

const configureStore = () => createStore(combineReducers({
    main: notesReducer,
    filters: filtersReducer
}));

export default configureStore;