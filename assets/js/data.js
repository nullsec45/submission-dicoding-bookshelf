import { STORAGE_KEY_UNCOMPLETED, STORAGE_KEY_COMPLETED, DATA_BOOKS, DATA_BOOKS_COMPLETED } from "./constant.js";


export default class ManageLocalStorage {
    static DATA_BOOKS_STORAGE_UNCOMPLETED = localStorage.getItem(STORAGE_KEY_UNCOMPLETED) ? JSON.parse(localStorage.getItem(STORAGE_KEY_UNCOMPLETED)) : [];
    static DATA_BOOKS_STORAGE_COMPLETED = localStorage.getItem(STORAGE_KEY_COMPLETED) ? JSON.parse(localStorage.getItem(STORAGE_KEY_COMPLETED)) : [];

    static get _isStorageExists() {
        if (typeof (Storage) === undefined) {
            alert("Browser kamu tidak mendukung local storage");
            return false;
        }
        return true;
    }

    static get getDataBooksUncompleted() {
        return this.DATA_BOOKS_STORAGE_UNCOMPLETED;
    }

    static get getDataBooksCompleted() {
        return this.DATA_BOOKS_STORAGE_COMPLETED
    }

    static get setLocalStorage() {
        if (this._isStorageExists) {
            if (this.getDataBooksUncompleted.length == 0 && this.getDataBooksCompleted.length == 0) {
                localStorage.setItem(STORAGE_KEY_UNCOMPLETED, "");
                localStorage.setItem(STORAGE_KEY_COMPLETED, "");
            }
        }
    }

    static store(title, author, year, isComplete, page) {

        DATA_BOOKS.push({
            id: Math.random().toString(16).slice(2),
            title,
            author,
            year,
            isComplete,
            page
        })

        let cekBuku = DATA_BOOKS.find((book) => book.title == title);
        if (cekBuku) {
            localStorage.setItem(STORAGE_KEY_UNCOMPLETED, JSON.stringify(DATA_BOOKS_STORAGE_UNCOMPLETED));
            alert("Buku sudah ada di list");
            return
        }

        localStorage.setItem(STORAGE_KEY_UNCOMPLETED, JSON.stringify(DATA_BOOKS));
    }
}
