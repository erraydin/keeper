const initialState = {
    sidebarOpenMobile: false,
}

const uiReducer = (state = initialState, action) => {
    switch (action.type) {
      case "OPEN_SIDEBAR":
        return {
            sidebarOpenMobile: true,
        };
      case "CLOSE_SIDEBAR":
        return {
            sidebarOpenMobile: false,
        }
      default:
        return state;
    }
  };
  
  export default uiReducer;