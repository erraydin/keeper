import { v4 as uuidv4 } from 'uuid';

export const addNote = (note) => ({type: "ADD", note: {...note, id: uuidv4(), type: "note"}});

export const deleteNote = (id) => ({type: "DELETE", id: id});

export const deleteNotePermanently = (id) => ({type: "DELETE_PERMANENTLY", id: id});

export const editNote = (id, note) => ({type: "EDIT", note: note, id: id});

export const archiveNote = (note) => ({type: "ARCHIVE", note: note})

export const archiveDirectly = (note) => ({type: "ARCHIVE_DIRECTLY", note: {...note, id: uuidv4()}});

export const editAndArchive = (oldNote, newNote) => ({type: "EDIT_AND_ARCHIVE", oldNote: oldNote, newNote: newNote});

export const editAndUnarchive = (oldNote, newNote) => ({type: "EDIT_AND_UNARCHIVE", oldNote: oldNote, newNote: newNote});

export const unarchiveNote = (note) => ({type: "UNARCHIVE", note: note});

export const restoreNote = (id) => ({type: "RESTORE", id: id});

export const emptyTrash = () => ({type: "EMPTY_TRASH"});

export const addNewLabel = (label) => ({type: "ADD_NEW_LABEL", label: label});

//Deletes a label completely, from all notes, all trash notes, and from labels list
export const deleteLabelCompletely = (label) => ({type: "DELETE_LABEL_COMPLETELY", label: label});



export const editLabel = (oldLabel, newLabel) => ({type: "EDIT_LABEL", oldLabel: oldLabel, newLabel: newLabel});

// export const listItemCheckedToggle = (noteId, listItem, checked) => ({type: "LIST_ITEM_CHECKED_TOGGLE", noteId: noteId, listItem: listItem, checked: checked});

export const addList = (list) => ({type: "ADD_LIST", list: {...list, id: uuidv4()}});