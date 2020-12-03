function getVisibleNotes (notes, labelName, searchText, color) {
    if (notes.length === 0) {
        return [];
    }
    return (
        notes.filter(note => {
            const labelMatch = labelName === "" || note.labels.includes(labelName);
            let labelsIncludeText = true;
            if (searchText !== "") {
                labelsIncludeText = false;
            }
            for (let label of note.labels){
                if (label.toLowerCase().includes(searchText.toLowerCase())) {
                    labelsIncludeText = true;
                    break;
                }
            }
            const searchTextMatch = note.title.toLowerCase().includes(searchText.toLowerCase()) || note.content.toLowerCase().includes(searchText.toLowerCase()) || labelsIncludeText;
            const colorMatch = color === "" || note.color === color;
            return labelMatch && searchTextMatch && colorMatch;
        })
    );
}

export default getVisibleNotes;