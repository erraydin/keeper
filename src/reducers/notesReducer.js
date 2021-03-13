// import { loadState } from "../utils/localStorage";
// const loadedState = loadState("main");
const initialState = {
  notes: [],
  labels: [],
  trash: [],
  archive: [],
};

// loadedState !== null
//   ? loadedState
//   : {
//       notes: [],
//       labels: [],
//       trash: [],
//       archive: [],
//     };

const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_MAIN_STATE":
      return action.state;
    case "ADD":
      return {
        ...state,
        notes: [action.note, ...state.notes],
      };
    case "ARCHIVE_DIRECTLY":
      const unpinnedNote1 = { ...action.note, pinned: false };
      return {
        ...state,
        archive: [unpinnedNote1, ...state.archive],
      };
    case "EDIT":
      const editedNotes = [...state.notes];
      const editedArchive = [...state.archive];
      let editIndex = state.notes.findIndex((note) => note.id === action.id);
      if (editIndex > -1) {
        editedNotes[editIndex] = action.note;
      } else {
        editIndex = state.archive.findIndex((note) => note.id === action.id);
        if (action.note.pinned) {
          editedArchive.splice(editIndex, 1);
          editedNotes.unshift(action.note);
        } else {
          editedArchive[editIndex] = action.note;
        }
      }

      return {
        ...state,
        notes: editedNotes,
        archive: editedArchive,
      };

    case "ARCHIVE":
      const archiveIndex = state.notes.findIndex(
        (note) => note.id === action.note.id
      );
      const archivedNotes = state.notes.filter((note) => {
        return note.id !== action.note.id;
      });
      const pinRemovedNoteArchive = {
        ...state.notes[archiveIndex],
        pinned: false,
      };
      return {
        ...state,
        notes: archivedNotes,
        archive: [pinRemovedNoteArchive, ...state.archive],
      };
    case "UNARCHIVE":
      const unarchiveIndex = state.archive.findIndex(
        (note) => note.id === action.note.id
      );
      const unarchivedArchive = state.archive.filter((note) => {
        return note.id !== action.note.id;
      });
      return {
        ...state,
        archive: unarchivedArchive,
        notes: [state.archive[unarchiveIndex], ...state.notes],
      };
    case "DELETE":
      const deleteIndex = state.notes.findIndex(
        (note) => note.id === action.id
      );
      let deletedNotes = [...state.notes];
      let deletedTrash = [...state.trash];
      let deletedArchive = [...state.archive];
      if (deleteIndex > -1) {
        deletedNotes = state.notes.filter((note) => {
          return note.id !== action.id;
        });
        const pinRemovedNote = { ...state.notes[deleteIndex], pinned: false };
        deletedTrash = [pinRemovedNote, ...state.trash];
      } else {
        const deleteIndexArchive = state.archive.findIndex(
          (note) => note.id === action.id
        );
        deletedArchive = state.archive.filter((note) => {
          return note.id !== action.id;
        });
        deletedTrash = [state.archive[deleteIndexArchive], ...state.trash];
      }

      return {
        ...state,
        notes: deletedNotes,
        trash: deletedTrash,
        archive: deletedArchive,
      };
    case "RESTORE":
      const restoreIndex = state.trash.findIndex(
        (note) => note.id === action.id
      );
      const restoredTrash = state.trash.filter((_, index) => {
        return index !== restoreIndex;
      });
      return {
        ...state,
        notes: [...state.notes, state.trash[restoreIndex]],
        trash: restoredTrash,
      };
    case "DELETE_PERMANENTLY":
      const permDeleteIndex = state.trash.findIndex(
        (note) => note.id === action.id
      );
      const newTrash = state.trash.filter((_, index) => {
        return index !== permDeleteIndex;
      });
      return {
        ...state,
        trash: newTrash,
      };
    case "EMPTY_TRASH":
      return {
        ...state,
        trash: [],
      };
    case "ADD_NEW_LABEL":
      const newLabels =
        state.labels.includes(action.label) || action.label === ""
          ? [...state.labels]
          : [action.label, ...state.labels];
      return {
        ...state,
        labels: newLabels,
      };
    case "EDIT_LABEL":
      if (!action.newLabel) {
        return state;
      }
      const editLabelIndex = state.labels.indexOf(action.oldLabel);
      const editedLabels = [...state.labels];
      editedLabels[editLabelIndex] = action.newLabel;

      const editedLabelNotes = state.notes.map((note) => {
        const newLabelsOfNote = note.labels.map((label) => {
          if (label === action.oldLabel) {
            return action.newLabel;
          } else {
            return label;
          }
        });
        return { ...note, labels: newLabelsOfNote };
      });

      const editedLabelTrash = state.trash.map((note) => {
        const newLabelsOfTrashNote = note.labels.map((label) => {
          if (label === action.oldLabel) {
            return action.newLabel;
          } else {
            return label;
          }
        });
        return { ...note, labels: newLabelsOfTrashNote };
      });

      const editedLabelArchive = state.archive.map((note) => {
        const newLabelsOfArchiveNote = note.labels.map((label) => {
          if (label === action.oldLabel) {
            return action.newLabel;
          } else {
            return label;
          }
        });
        return { ...note, labels: newLabelsOfArchiveNote };
      });

      return {
        labels: editedLabels,
        notes: editedLabelNotes,
        trash: editedLabelTrash,
        archive: editedLabelArchive,
      };
    case "DELETE_LABEL_COMPLETELY":
      const deletedLabels = state.labels.filter((label) => {
        return label !== action.label;
      });

      const deletedLabelNotes = state.notes.map((note) => {
        const deletedLabelsOfNote = note.labels.filter((label) => {
          return label !== action.label;
        });
        return { ...note, labels: deletedLabelsOfNote };
      });

      const deletedLabelTrash = state.trash.map((note) => {
        const deletedLabelsOfTrash = note.labels.filter((label) => {
          return label !== action.label;
        });
        return { ...note, labels: deletedLabelsOfTrash };
      });

      const deletedLabelArchive = state.archive.map((note) => {
        const deletedLabelsOfArchive = note.labels.filter((label) => {
          return label !== action.label;
        });
        return { ...note, labels: deletedLabelsOfArchive };
      });
      return {
        labels: deletedLabels,
        notes: deletedLabelNotes,
        trash: deletedLabelTrash,
        archive: deletedLabelArchive,
      };

    case "ADD_LIST":
      return {
        ...state,
        notes: [action.list, ...state.notes],
      };
    case "EDIT_AND_ARCHIVE":
      const editedAndArchivedNotes = state.notes.filter((note) => {
        return note.id !== action.oldNote.id;
      });
      const unpinnedNote2 = { ...action.newNote, pinned: false };
      const editedAndArchivedArchive = [unpinnedNote2, ...state.archive];

      return {
        ...state,
        notes: editedAndArchivedNotes,
        archive: editedAndArchivedArchive,
      };
    case "EDIT_AND_UNARCHIVE":
      const editedAndUnarchivedArchive = state.archive.filter((note) => {
        return note.id !== action.oldNote.id;
      });
      const editedAndUnarchivedNotes = [action.newNote, ...state.notes];
      return {
        ...state,
        notes: editedAndUnarchivedNotes,
        archive: editedAndUnarchivedArchive,
      };
    default:
      return state;
  }
};

export default notesReducer;
