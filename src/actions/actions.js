import { v4 as uuidv4 } from 'uuid';

export const addNote = (note) => ({type: "ADD", note: {...note, id: uuidv4()}});

export const deleteNote = (id) => ({type: "DELETE", id: id});

export const deleteNotePermanently = (id) => ({type: "DELETE_PERMANENTLY", id: id});

export const editNote = (id, note) => ({type: "EDIT", note: note, id: id});

export const restoreNote = (id) => ({type: "RESTORE", id: id});

export const emptyTrash = () => ({type: "EMPTY_TRASH"});

export const addNewLabel = (labelName) => ({type: "ADD_NEW_LABEL", label: {labelName: labelName, id: uuidv4()}});

//Deletes a label completely, from all notes, all trash notes, and from labels list
export const deleteLabel = (id) => ({type: "DELETE_LABEL", id: id});

export const editLabel = (id, newLabelName) => ({type: "EDIT_LABEL", id: id, newLabelName: newLabelName});

