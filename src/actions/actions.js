import { v4 as uuidv4 } from 'uuid';

export const addNote = (note) => ({type: "ADD", note: {...note, id: uuidv4()}});

export const deleteNote = (id) => ({type: "DELETE", id: id});

export const deleteNotePermanently = (id) => ({type: "DELETE_PERMANENTLY", id: id});

export const editNote = (id, note) => ({type: "EDIT", note: note, id: id});

export const restoreNote = (id) => ({type: "RESTORE", id: id});

export const emptyTrash = () => ({type: "EMPTY_TRASH"});

export const addNewLabel = (label) => ({type: "ADD_NEW_LABEL", label: label});

//Deletes a label completely, from all notes, all trash notes, and from labels list
export const deleteLabelCompletely = (label) => ({type: "DELETE_LABEL_COMPLETELY", label: label});

export const deleteLabelFromNote = (label, noteId) => ({type: "DELETE_LABEL_FROM_NOTE", label: label, noteId: noteId});

export const editLabel = (oldLabel, newLabel) => ({type: "EDIT_LABEL", oldLabel: oldLabel, newLabel: newLabel});

