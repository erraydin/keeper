import { v4 as uuidv4 } from "uuid";
import { firebase } from "../firebase/firebase";
import { syncFail, syncingStart, syncSuccess } from "./ui";
import { updateDatabase } from "../utils/firebaseToState";

export const addNoteSync = (note) => ({
  type: "ADD",
  note: { ...note, id: uuidv4(), type: "note" },
});

export const addNote = (note) => {
  return (dispatch, getState) => {
    dispatch(addNoteSync(note));
    updateDatabase(
      dispatch,
      getState,
      syncingStart,
      syncSuccess,
      syncFail,
      firebase
    );
    // const uid = getState().auth.uid;
    // const route = "/users/" + uid;
    // dispatch(syncingStart());
    // firebase
    //   .database()
    //   .ref(route)
    //   .set(getState().main)
    //   .then(() => {
    //     dispatch(syncSuccess());
    //   })
    //   .catch(() => {
    //     dispatch(syncFail());
    //   });
  };
};

//If you want put the data to database before putting it redux store
// In many cases this makes much more sense. in this app I don't think it matters that much, if you catch errors and let the client know sync failed

// export const addNote = (note) => {
//   return (dispatch, getState) => {
//     const oldState = getState().main;
//     const newState = {
//       ...oldState,
//       notes: [note, ...oldState.notes],
//     };
//     const uid = getState().auth.uid;
//     const route = "/users/" + uid + ".json";
//     axios.put(route, newState).then(() => {
//       dispatch(setMainState(newState));
//     });
//   };
// };

export const deleteNoteSync = (id) => ({ type: "DELETE", id: id });

export const deleteNote = (id) => {
  return (dispatch, getState) => {
    dispatch(deleteNoteSync(id));
    updateDatabase(
      dispatch,
      getState,
      syncingStart,
      syncSuccess,
      syncFail,
      firebase
    );
  };
};

export const deleteNotePermanentlySync = (id) => ({
  type: "DELETE_PERMANENTLY",
  id: id,
});

export const deleteNotePermanently = (id) => {
  return (dispatch, getState) => {
    dispatch(deleteNotePermanentlySync(id));
    updateDatabase(
      dispatch,
      getState,
      syncingStart,
      syncSuccess,
      syncFail,
      firebase
    );
  };
};

export const editNoteSync = (id, note) => ({
  type: "EDIT",
  note: note,
  id: id,
});

export const editNote = (id, note) => {
  return (dispatch, getState) => {
    dispatch(editNoteSync(id, note));
    updateDatabase(
      dispatch,
      getState,
      syncingStart,
      syncSuccess,
      syncFail,
      firebase
    );
  };
};

export const archiveNoteSync = (note) => ({ type: "ARCHIVE", note: note });

export const archiveNote = (note) => {
  return (dispatch, getState) => {
    dispatch(archiveNoteSync(note));
    updateDatabase(
      dispatch,
      getState,
      syncingStart,
      syncSuccess,
      syncFail,
      firebase
    );
  };
};

export const archiveDirectlySync = (note) => ({
  type: "ARCHIVE_DIRECTLY",
  note: { ...note, id: uuidv4() },
});

export const archiveDirectly = (note) => {
  return (dispatch, getState) => {
    dispatch(archiveDirectlySync(note));
    updateDatabase(
      dispatch,
      getState,
      syncingStart,
      syncSuccess,
      syncFail,
      firebase
    );
  };
};

export const editAndArchiveSync = (oldNote, newNote) => ({
  type: "EDIT_AND_ARCHIVE",
  oldNote: oldNote,
  newNote: newNote,
});

export const editAndArchive = (oldNote, newNote) => {
  return (dispatch, getState) => {
    dispatch(editAndArchiveSync(oldNote, newNote));
    updateDatabase(
      dispatch,
      getState,
      syncingStart,
      syncSuccess,
      syncFail,
      firebase
    );
  };
};

export const editAndUnarchiveSync = (oldNote, newNote) => ({
  type: "EDIT_AND_UNARCHIVE",
  oldNote: oldNote,
  newNote: newNote,
});

export const editAndUnarchive = (oldNote, newNote) => {
  return (dispatch, getState) => {
    dispatch(editAndUnarchiveSync(oldNote, newNote));
    updateDatabase(
      dispatch,
      getState,
      syncingStart,
      syncSuccess,
      syncFail,
      firebase
    );
  };
};

export const unarchiveNoteSync = (note) => ({ type: "UNARCHIVE", note: note });

export const unarchiveNote = (note) => {
  return (dispatch, getState) => {
    dispatch(unarchiveNoteSync(note));
    updateDatabase(
      dispatch,
      getState,
      syncingStart,
      syncSuccess,
      syncFail,
      firebase
    );
  };
};

export const restoreNoteSync = (id) => ({ type: "RESTORE", id: id });

export const restoreNote = (id) => {
  return (dispatch, getState) => {
    dispatch(restoreNoteSync(id));
    updateDatabase(
      dispatch,
      getState,
      syncingStart,
      syncSuccess,
      syncFail,
      firebase
    );
  };
};

export const emptyTrashSync = () => ({ type: "EMPTY_TRASH" });

export const emptyTrash = () => {
  return (dispatch, getState) => {
    dispatch(emptyTrashSync());
    updateDatabase(
      dispatch,
      getState,
      syncingStart,
      syncSuccess,
      syncFail,
      firebase
    );
  };
};

export const addNewLabelSync = (label) => ({
  type: "ADD_NEW_LABEL",
  label: label,
});

export const addNewLabel = (label) => {
  return (dispatch, getState) => {
    dispatch(addNewLabelSync(label));
    updateDatabase(
      dispatch,
      getState,
      syncingStart,
      syncSuccess,
      syncFail,
      firebase
    );
  };
};

//Deletes a label completely, from all notes, all trash notes, and from labels list
export const deleteLabelCompletelySync = (label) => ({
  type: "DELETE_LABEL_COMPLETELY",
  label: label,
});

export const deleteLabelCompletely = (label) => {
  return (dispatch, getState) => {
    dispatch(deleteLabelCompletelySync(label));
    updateDatabase(
      dispatch,
      getState,
      syncingStart,
      syncSuccess,
      syncFail,
      firebase
    );
  };
};

export const editLabelSync = (oldLabel, newLabel) => ({
  type: "EDIT_LABEL",
  oldLabel: oldLabel,
  newLabel: newLabel,
});

export const editLabel = (oldLabel, newLabel) => {
  return (dispatch, getState) => {
    dispatch(editLabelSync(oldLabel, newLabel));
    updateDatabase(
      dispatch,
      getState,
      syncingStart,
      syncSuccess,
      syncFail,
      firebase
    );
  };
};

// export const listItemCheckedToggle = (noteId, listItem, checked) => ({type: "LIST_ITEM_CHECKED_TOGGLE", noteId: noteId, listItem: listItem, checked: checked});

export const addListSync = (list) => ({
  type: "ADD_LIST",
  list: { ...list, id: uuidv4() },
});

export const addList = (list) => {
  return (dispatch, getState) => {
    dispatch(addListSync(list));
    updateDatabase(
      dispatch,
      getState,
      syncingStart,
      syncSuccess,
      syncFail,
      firebase
    );
  };
};

export const setMainState = (state) => ({ type: "SET_MAIN_STATE", state });

//Enden up not using, keep for reference
// export const startInitNotes = () => {
//   return (dispatch) => {
//     axios.get("/state.json").then((response) => {
//       const state = createState(response.data);
//       dispatch(setMainState(state));
//     });
//   };
// };
