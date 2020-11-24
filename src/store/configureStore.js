import { createStore, combineReducers } from "redux";
import notesReducer from "../reducers/notesReducer";

const configureStore = () => createStore(notesReducer);

export default configureStore;