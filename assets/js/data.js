import { STORAGE_KEY, DATA_BOOKS, } from "./constant.js";


export default class ManageLocalStorage {

    static get isStorageExists() {
        if (typeof (Storage) === undefined) {
            alert("Browser kamu tidak mendukung local storage");
            return false;
        }
        return true;
    }

    static get index() {
        const parsed = localStorage.getItem(STORAGE_KEY) ? JSON.parse(localStorage.getItem(STORAGE_KEY)) : [];
        // console.log(parsed)
        for (let data of parsed) {
            DATA_BOOKS.push(data);
        }
        console.log(DATA_BOOKS)
        return DATA_BOOKS;
    }


    static store(bookObject) {
        let { id, title, author, year, isCompleted } = bookObject;

        if (DATA_BOOKS.length > 0) {
            let cekBuku = DATA_BOOKS.find((book) => book.title == title);
            if (cekBuku) {
                alert("Buku sudah ada di list");
                return false
            }
        }
        DATA_BOOKS.push({ id, title, author, year, isCompleted });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DATA_BOOKS));
        alert("Buku berhasil ditambahkan");
        return true;
    }
}
