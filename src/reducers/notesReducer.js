const initialState = {
    notes: [],
    trash: [],
    labels: []
}

    
const notesReducer = (state=initialState, action) => {
    switch (action.type) {
        case "ADD":
            return {
                ...state,
                notes: [...state.notes, action.note ]
            }
        case "DELETE":
            const newNotes = state.notes.filter((_, index) => {
                return index !== action.index;
            })
            return {
                ...state,
                notes: newNotes,
                trash: [...state.trash, state.notes[action.index]]
            }
        case "DELETE_PERMANENTLY":
            const newTrash = state.trash.filter((_, index) => {
                return index !== action.index;
            })
            return {
                ...state,
                trash: newTrash
            }
        default:
            return state;
    }
};

export default notesReducer;