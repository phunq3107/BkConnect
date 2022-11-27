import constants from "../../constants";

export const getItemFromLocalStorage = (itemKey) => {
    const storage = JSON.parse(localStorage.getItem(constants.STORAGE_NAME))
    if (storage){
        return storage.hasOwnProperty(itemKey) ? storage[itemKey] : null
    }
    localStorage.setItem(constants.STORAGE_NAME, JSON.stringify({}));
    return null;
}

export const saveItemToLocalStorage = (key, value) => {
    const storage = JSON.parse(localStorage.getItem(constants.STORAGE_NAME))
    const updatedStorage = {
        ...storage,
        [key]: value
    }
    localStorage.setItem(constants.STORAGE_NAME, JSON.stringify(updatedStorage))
}