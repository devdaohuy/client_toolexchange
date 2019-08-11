function saveLocal(type,value) {
    const getTypeFromLocal = JSON.parse(localStorage.getItem(type));
    if ( !! getTypeFromLocal === false ) {
        localStorage.setItem(type, JSON.stringify(value))
    } else {
        localStorage.removeItem(type);
        localStorage.setItem(type, JSON.stringify(value));
    }
}

export {saveLocal};