const initialState = {
  filterLabel: "",
  filterText: "",
};

const filtersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_FILTER_LABEL":
      return {
        ...state,
        filterLabel: action.filterLabel,
      };
    default:
      return state;
  }
};

export default filtersReducer;
