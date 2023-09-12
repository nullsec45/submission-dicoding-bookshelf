import { STORAGE_KEY, DATA_BOOKS, setDataBooks } from "./constant.js";


export default class ManageLocalStorage {

    static get isStorageExists() {
        if (typeof (Storage) === undefined) {
            alert("Browser kamu tidak mendukung local storage :)");
            return false;
        }
        return true;
    }

    static _saveBookToLocalStorage(book) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(book));
    }

    static get _loadBooksStorage() {
        return localStorage.getItem(STORAGE_KEY) ? JSON.parse(localStorage.getItem(STORAGE_KEY)) : [];
    }

    static get index() {
        const books = this._loadBooksStorage

        for (let data of books) {
            DATA_BOOKS.push(data);
        }
        return DATA_BOOKS;
    }

    static findBook(bookId) {
        let books = this.index;
        return books.find((book) => book.id == bookId);
    }

    static isComplete(book) {
        const books = this._loadBooksStorage

        let index = books.map(book => book.title).indexOf(book.title);

        books.splice(index, 1, book);

        this._saveBookToLocalStorage(books);
        setDataBooks([]);
    }


    static store(bookObject) {
        let { id, title, author, year, isComplete } = bookObject;

        if (DATA_BOOKS.length > 0) {
            let cekBuku = DATA_BOOKS.find((book) => book.title == title);
            if (cekBuku) {
                alert("Buku sudah ada di list");
                return false
            }
        }
        DATA_BOOKS.push({ id, title, author, year, isComplete });

        this._saveBookToLocalStorage(DATA_BOOKS);

        setDataBooks([]);

        alert("Buku berhasil ditambahkan");
        return true;
    }

    static destroy(book) {
        const books = this._loadBooksStorage

        let index = books.map(book => book.title).indexOf(book.title);

        books.splice(index, 1);

        this._saveBookToLocalStorage(books);
        setDataBooks([]);
    }
}
