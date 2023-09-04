import BookEvent from "./event.js";
import { DATA_BOOKS, STORAGE_KEY } from "./constant.js";
import ManageLocalStorage from "./data.js";

window.addEventListener("load", function () {
    const root = document.querySelector("body");
    const bookEvent = new BookEvent(root);
    const manageLocalStorage = new ManageLocalStorage();
    if (manageLocalStorage.CheckLocalStorage) {
        localStorage.setItem(STORAGE_KEY, DATA_BOOKS);
    }
});

window.addEventListener("unload", function () {

});