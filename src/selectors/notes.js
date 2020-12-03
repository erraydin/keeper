function getVisibleNotes (notes, labelName, searchText, color) {
    if (notes.length === 0) {
        return [];
    }
    return (
        notes.filter(note => {
            const labelMatch = labelName === "" || note.labels.includes(labelName);
            let labelsIncludeText = false;
            for (let label of note.labels){
                if (label.toLowerCase().includes(searchText.toLowerCase())) {
                    labelsIncludeText = true;
                    break;
                }
            }
            let contentIncludesText = false;
            if (note.type === "note") {
                contentIncludesText = note.content.toLowerCase().includes(searchText.toLowerCase());
            } else {
                for (let item of note.checked){
                    if (item.item.toLowerCase().includes(searchText.toLowerCase())) {
                        contentIncludesText = true;
                        break;
                    }
                }
                for (let item of note.unchecked){
                    if (item.item.toLowerCase().includes(searchText.toLowerCase())) {
                        contentIncludesText = true;
                        break;
                    }
                }
            }

            const searchTextMatch = note.title.toLowerCase().includes(searchText.toLowerCase()) || contentIncludesText || labelsIncludeText;
            const colorMatch = color === "" || note.color === color;
            return labelMatch && searchTextMatch && colorMatch;
        })
    );
}

export default getVisibleNotes;