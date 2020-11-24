import { v4 as uuidv4 } from 'uuid';

export const addNote = (note) => ({type: "ADD", note: {...note, id: uuidv4()}});

export const deleteNote = (index) => ({type: "DELETE", index: index});

export const deleteNotePermanently = (index) => ({type: "DELETE_PERMANENTLY", index: index});

export const editNote = (index, note) => ({type: "EDIT", note: note, index: index});

export const restoreNote = (index) => ({type: "RESTORE", index: index});

export const emptyTrash = () => ({type: "EMPTY_TRASH"});