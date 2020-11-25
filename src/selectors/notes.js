function getVisibleNotes (notes, label, searchText) {
    if (notes.length === 0) {
        return [];
    }
    return (
        notes.filter(note => {
            const labelMatch = label === "" || note.labels.includes(label);
            const searchTextMatch = note.title.toLowerCase().includes(searchText.toLowerCase()) || note.content.toLowerCase().includes(searchText.toLowerCase());
            return labelMatch && searchTextMatch;
        })
    );
}

export default getVisibleNotes;