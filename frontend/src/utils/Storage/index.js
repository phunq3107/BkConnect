import constants from "../../constants";

export const appLocalStorage = {
    getItem: (itemKey) => {
        const storage = JSON.parse(localStorage.getItem(constants.STORAGE_NAME))
        if (storage) {
            return storage.hasOwnProperty(itemKey) ? storage[itemKey] : null
        }
        localStorage.setItem(constants.STORAGE_NAME, JSON.stringify({}));
        return null;
    },

    saveItem: (key, value) => {
        const storage = JSON.parse(localStorage.getItem(constants.STORAGE_NAME))
        const updatedStorage = {
            ...storage,
            [key]: value
        }
        localStorage.setItem(constants.STORAGE_NAME, JSON.stringify(updatedStorage))
    },

    removeItem: (itemKey) => {
        let storage = JSON.parse(localStorage.getItem(constants.STORAGE_NAME))
        if (storage && storage.hasOwnProperty(itemKey)){
            delete storage[itemKey]
            localStorage.setItem(constants.STORAGE_NAME, JSON.stringify(storage))
        }
    }
}

