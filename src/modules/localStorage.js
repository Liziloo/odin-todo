
export { storeItem };

function storageAvailable(type) {
    let storage;
    try {
        storage = window[type];
        const x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
        return (
            e instanceof DOMException &&
            e.name === 'QuotaExceededError' &&
            storage &&
            storage.length !== 0
        );
    }
}

const storeItem = (identifier, item) => {
    if (storageAvailable('localStorage')) {
        localStorage.setItem(identifier, JSON.stringify(item));
    } else {
        return;
    }
}
