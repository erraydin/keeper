function getVisibleNotes (notes, labelName, searchText) {
    if (notes.length === 0) {
        return [];
    }
    return (
        notes.filter(note => {
            const labelNames = note.labels.map(label => {
                return label.labelName
            })
            const labelMatch = labelName === "" || labelNames.includes(labelName);
            const searchTextMatch = note.title.toLowerCase().includes(searchText.toLowerCase()) || note.content.toLowerCase().includes(searchText.toLowerCase());
            return labelMatch && searchTextMatch;
        })
    );
}

export default getVisibleNotes;