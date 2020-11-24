import { v4 as uuidv4 } from 'uuid';

export const addNote = (note) => ({type: "ADD", note: {...note, id: uuidv4()}});

export const deleteNote = (index) => ({type: "DELETE", index: index});

export const deleteNotePermanently = (index) => ({type: "DELETE_PERMANENTLY", index: index});