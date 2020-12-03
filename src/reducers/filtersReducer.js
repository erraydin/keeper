const initialState = {
  filterColor: "",
  filterText: "",
};

const filtersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_FILTER_TEXT":
      return {
        ...state,
        filterText: action.filterText,
      };
    default:
      return state;
  }
};

export default filtersReducer;
