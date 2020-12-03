export const loadState = (name) => {
    try {
        const serializedState = localStorage.getItem(name);
        if (serializedState === null) {
            return null;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return null;
    }
}

export const saveState = (state) => {
    try {
        const mainSerializedState = JSON.stringify(state.main);
        const filtersSerializedState = JSON.stringify(state.filters);
        localStorage.setItem("main", mainSerializedState);
        localStorage.setItem("filters", filtersSerializedState);
    } catch (err) {
        //ignore errors
    }
}