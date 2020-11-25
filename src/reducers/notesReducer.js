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
        notes: [...state.notes, action.note],
      };
    case "EDIT":
      const editedNotes = [...state.notes];
      editedNotes[action.index] = action.note;
      return {
        ...state,
        notes: editedNotes,
      };
    case "DELETE":
      const deletedNotes = state.notes.filter((_, index) => {
        return index !== action.index;
      });
      return {
        ...state,
        notes: deletedNotes,
        trash: [...state.trash, state.notes[action.index]],
      };
    case "RESTORE":
      const restoredTrash = state.trash.filter((_, index) => {
        return index !== action.index
      });
      return {
        ...state,
        notes: [...state.notes, state.trash[action.index]],
        trash: restoredTrash,
      }
    case "DELETE_PERMANENTLY":
      const newTrash = state.trash.filter((_, index) => {
        return index !== action.index;
      });
      return {
        ...state,
        trash: newTrash,
      };
    case "EMPTY_TRASH":
      return {
        ...state,
        trash: [],
      }
    case "ADD_NEW_LABEL":
      const newLabels = state.labels.includes(action.label) ? [...state.labels] : [action.label, ...state.labels];
      return {
        ...state,
        labels: newLabels
      }
    default:
      return state;
  }
};

export default notesReducer;
