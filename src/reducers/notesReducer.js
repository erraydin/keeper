const initialState = {
  notes: [],
  labels: [],
  trash: [],
};

const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        notes: [action.note, ...state.notes],
      };
    case "EDIT":
      const editedNotes = [...state.notes];
      const editIndex = state.notes.findIndex((note) => note.id === action.id);
      editedNotes[editIndex] = action.note;
      return {
        ...state,
        notes: editedNotes,
      };
    case "DELETE":
      const deleteIndex = state.notes.findIndex(
        (note) => note.id === action.id
      );
      const deletedNotes = state.notes.filter((_, index) => {
        return index !== deleteIndex;
      });
      return {
        ...state,
        notes: deletedNotes,
        trash: [...state.trash, state.notes[deleteIndex]],
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

      return {
        labels: editedLabels,
        notes: editedLabelNotes,
        trash: editedLabelTrash,
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
      return {
        labels: deletedLabels,
        notes: deletedLabelNotes,
        trash: deletedLabelTrash,
      };
    case "DELETE_LABEL_FROM_NOTE":
      const indexOfNote = state.notes.findIndex((note) => {
        return note.id === action.noteId;
      });
      const newLabelsOfLabelRemovedNote = state.notes[
        indexOfNote
      ].labels.filter((label) => {
        return label !== action.label;
      });

      const labelRemovedNotesArray = [...state.notes];
      labelRemovedNotesArray[indexOfNote] = {
        ...state.notes[indexOfNote],
        labels: newLabelsOfLabelRemovedNote,
      };

      return {
        ...state,
        notes: labelRemovedNotesArray,
      };
    case "ADD_LIST":
      return {
        ...state,
        notes: [action.list, ...state.notes],
      };
    case "LIST_ITEM_CHECKED_TOGGLE":
      if (action.checked) {
        let ListNoteIndex = state.notes.findIndex((note) => {
          return action.noteId === note.id;
        });
        let listNote = state.notes[ListNoteIndex];
        let newCheckedList = listNote.checked.filter((listItem) => {
          return listItem.id !== action.listItem.id;
        });
        let newUncheckedList = [action.listItem, ...listNote.unchecked];
        let newNotes = [...state.notes];
        newNotes[ListNoteIndex] = {
          ...listNote,
          checked: newCheckedList,
          unchecked: newUncheckedList,
        };
        return {
          ...state,
          notes: newNotes,
        };
      } else {
        let ListNoteIndex = state.notes.findIndex((note) => {
          return action.noteId === note.id;
        });
        let listNote = state.notes[ListNoteIndex];
        let newCheckedList = [action.listItem, ...listNote.checked];
        let newUncheckedList = listNote.unchecked.filter((listItem) => {
          return listItem.id !== action.listItem.id;
        });
        let newNotes = [...state.notes];
        newNotes[ListNoteIndex] = {
          ...listNote,
          checked: newCheckedList,
          unchecked: newUncheckedList,
        };
        return {
          ...state,
          notes: newNotes,
        };
      }
    default:
      return state;
  }
};

export default notesReducer;
