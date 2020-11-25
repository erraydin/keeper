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
      const editIndex = state.notes.findIndex(note => note.id === action.id)
      editedNotes[editIndex] = action.note;
      return {
        ...state,
        notes: editedNotes,
      };
    case "DELETE":
      const deleteIndex = state.notes.findIndex(note => note.id === action.id)
      const deletedNotes = state.notes.filter((_, index) => {
        return index !== deleteIndex;
      });
      return {
        ...state,
        notes: deletedNotes,
        trash: [...state.trash, state.notes[deleteIndex]],
      };
    case "RESTORE":
      const restoreIndex = state.trash.findIndex(note => note.id === action.id)
      const restoredTrash = state.trash.filter((_, index) => {
        return index !== restoreIndex
      });
      return {
        ...state,
        notes: [...state.notes, state.trash[restoreIndex]],
        trash: restoredTrash,
      }
    case "DELETE_PERMANENTLY":
      const permDeleteIndex = state.trash.findIndex(note => note.id === action.id)
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
      }
    case "ADD_NEW_LABEL":
      const newLabels = state.labels.includes(action.label) || action.label==="" ? [...state.labels] : [action.label, ...state.labels];
      return {
        ...state,
        labels: newLabels
      }
    default:
      return state;
  }
};

export default notesReducer;
