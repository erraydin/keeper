const authReducer = (state = { loggingIn: false, uid: null }, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        loggingIn: true,
        uid: action.uid,
      };
    case "LOGOUT":
      return {
        ...state,
        uid: null,
      };
    case "SET_LOGGING_IN":
      return {
        ...state,
        loggingIn: action.truth,
      };
    default:
      return state;
  }
};

export default authReducer;
