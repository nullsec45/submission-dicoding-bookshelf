export default class ManageLocalStorage {
    get isStorageExists() {
        if (typeof (Storage) === undefined) {
            alert("Browser kamu tidak mendukung local storage");
            return false;
        }
        return true;
    }
}
