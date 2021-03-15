//syncStatus : "synced", "syncing", "failed"
const initialState = {
  sidebarOpenMobile: false,
  syncStatus: "synced",
};

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case "OPEN_SIDEBAR":
      return {
        ...state,
        sidebarOpenMobile: true,
      };
    case "CLOSE_SIDEBAR":
      return {
        ...state,
        sidebarOpenMobile: false,
      };
    case "SYNCING_START":
      return {
        ...state,
        syncStatus: "syncing",
      };
    case "SYNC_SUCCESS":
      return {
        ...state,
        syncStatus: "synced",
      };
    case "SYNC_FAIL":
      return {
        ...state,
        syncStatus: "failed",
      };
    default:
      return state;
  }
};

export default uiReducer;
