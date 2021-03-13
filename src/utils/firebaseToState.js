import axios from "../axios-notes";
import { setMainState } from "../actions/actions";

const transform = (responseData, type) => {
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

export const initNotes = (store) => {
  axios.get("/state.json").then((response) => {
    // console.log(response.data.archived);
    const notes = transform(response.data, "notes");
    const trash = transform(response.data, "trash");
    const archive = transform(response.data, "archive");
    let allLabels = [];
    if (response.data && response.data.labels !== undefined) {
      allLabels = Object.values(response.data.labels);
    }
    const mainState = {
      notes: notes,
      trash: trash,
      archive: archive,
      labels: allLabels,
    };
    store.dispatch(setMainState(mainState));
  });
};
