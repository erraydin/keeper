export const transform = (responseData, type) => {
  if (responseData) {
    let subData = responseData.notes;
    if (type === "trash") {
      subData = responseData.trash;
    } else if (type === "archive") {
      subData = responseData.archive;
    }
    if (subData) {
      return Object.values(subData).map((note) => {
        let labels = [];
        if (note.labels !== undefined) {
          labels = Object.values(note.labels);
        }
        if (note.type === "list") {
          let checked = [];
          let unchecked = [];
          if (note.checked !== undefined) {
            checked = Object.values(note.checked);
          }
          if (note.unchecked !== undefined) {
            unchecked = Object.values(note.unchecked);
          }
          return {
            ...note,
            labels: labels,
            checked: checked,
            unchecked: unchecked,
          };
        } else {
          return { ...note, labels: labels };
        }
      });
    } else {
      return [];
    }
  } else {
    return [];
  }
};

export const createState = (data) => {
  const notes = transform(data, "notes");
  const trash = transform(data, "trash");
  const archive = transform(data, "archive");
  let allLabels = [];
  if (data && data.labels !== undefined) {
    allLabels = Object.values(data.labels);
  }
  const mainState = {
    notes: notes,
    trash: trash,
    archive: archive,
    labels: allLabels,
  };
  return mainState;
};

export const updateDatabase = (
  dispatch,
  getState,
  syncingStart,
  syncSuccess,
  syncFail,
  firebase
) => {
  const uid = getState().auth.uid;
  const route = "/users/" + uid;
  dispatch(syncingStart());
  firebase
    .database()
    .ref(route)
    .set(getState().main)
    .then(() => {
      dispatch(syncSuccess());
    })
    .catch(() => {
      dispatch(syncFail());
    });
};
