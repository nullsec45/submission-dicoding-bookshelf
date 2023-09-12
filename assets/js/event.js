import { typeNumber } from "./utils.js";
import ManageLocalStorage from "./data.js";


export default class BookEvent {
    constructor() {
        this.inputBookTitle = document.querySelector("#input_book_title");
        this.inputBookAuthor = document.querySelector("#input_book_author");
        this.inputBookYear = document.querySelector("#input_book_year");
        this.inputBookIsCompleted = document.querySelector("#input_book_is_completed");

        this.incompleteBookshelfList = document.getElementById("incomplete_bookshelf_list");
        this.completeBookshelfList = document.getElementById("complete_bookshelf_list");
        this.bookSubmit = document.querySelector("#book_submit");
        this.textButtonSubmit = document.querySelector("#text_button_submit");
        this.searchSubmit = document.querySelector("#search_submit");
        this.searchBookTitle = document.querySelector("#search_book_title");
        this.emptyBook = document.querySelector("#empty_book");
        this.emptyBookTitle = this.emptyBook.querySelector("#title");
        this.containerInCompleted = document.querySelector("#incompleted_container");
        this.containerCompleted = document.querySelector("#completed_container");


        typeNumber(this.inputBookYear);

    }
    _addToUncompleted(bookId) {
        let book = ManageLocalStorage.findBook(bookId);
        book.isCompleted = false;

        ManageLocalStorage.isCompleted(book);
        this.getBooksList();
    }

    _addToCompleted(bookId) {
        let book = ManageLocalStorage.findBook(bookId);
        book.isCompleted = true;

        ManageLocalStorage.isCompleted(book);
        this.getBooksList();
    }

    _removeBook(bookId) {
        let konfirmasi = confirm("Apa anda yakin ingin menghapus buku dari daftar buku");
        if (!konfirmasi) {
            return
        }
        let book = ManageLocalStorage.findBook(bookId);
        ManageLocalStorage.destroy(book);
        this.getBooksList();
    }

    _renderElementBook(bookObject) {
        let { id, title, author, year, isCompleted } = bookObject;

        const container = document.createElement("article");
        container.setAttribute("class", "book_item");
        container.setAttribute("data-id", `book-${id}`);

        const bookTitle = document.createElement("h3");
        bookTitle.innerText = `${title}`;
        container.append(bookTitle)

        const penulis = document.createElement("p");
        penulis.innerText = `Penulis : ${author}`;
        container.append(penulis);

        const tahun = document.createElement("p");
        tahun.innerText = `Tahun : ${year}`;
        container.append(tahun);

        const action = document.createElement("div");
        action.setAttribute("class", "action");


        const buttonIsCompleted = document.createElement("button");
        buttonIsCompleted.setAttribute("class", "green");
        buttonIsCompleted.innerText = `${isCompleted == true ? "Belum selesai dibaca" : "Selesai dibaca"}`;

        buttonIsCompleted.addEventListener("click", () => {
            if (isCompleted) {
                this._addToUncompleted(id);
            } else {
                this._addToCompleted(id);
            }
        })

        const buttonRemoveBook = document.createElement("button");
        buttonRemoveBook.setAttribute("class", "red");
        buttonRemoveBook.innerText = "Hapus Buku";

        buttonRemoveBook.addEventListener("click", () => {
            this._removeBook(id);
        })

        action.append(buttonIsCompleted);
        action.append(buttonRemoveBook);

        container.append(action);

        return container;
    }

    _appendToContainer(book) {
        let bookElement = this._renderElementBook(book);

        if (book.isCompleted) {
            this.containerCompleted.style.display = "block";
            this.completeBookshelfList.appendChild(bookElement);
        } else {
            this.containerInCompleted.style.display = "block";
            this.incompleteBookshelfList.appendChild(bookElement);
        }
    }

    getBooksList() {
        if (ManageLocalStorage.isStorageExists) {
            this.completeBookshelfList.innerHTML = "";
            this.incompleteBookshelfList.innerHTML = "";

            let books = [];

            ManageLocalStorage.index.forEach((book) => {
                books.push(book);
            });

            if (books.length === 0) {
                this.emptyBook.style.display = "block";
                return;
            }
            this.emptyBook.style.display = "none";

            books.forEach((book) => {
                this._appendToContainer(book);
            })
        }
    }

    searchBook() {
        let title = this.searchBookTitle.value;
        let searchBook = new RegExp(title, "gi");
        let result = [];

        if (title.trim("") == "") {
            alert("Search Title Tidak Boleh Kosong!");
            return;
        }


        this.emptyBook.style.display = "block";
        this.emptyBookTitle.innerText = "Sedang mencari buku...";
        this.containerCompleted.style.display = "none";
        this.containerInCompleted.style.display = "none";


        ManageLocalStorage.index.map((book) => {
            if (searchBook.test(book.title)) {
                result.push(book);
            }
        })


        setTimeout(() => {
            this.emptyBook.style.display = "none";
            if (result.length === 0) {
                this.emptyBook.style.display = "block";
                this.emptyBookTitle.innerText = "Buku yang anda cari tidak ditemukan";
                return;
            }

            result.forEach((book) => {
                this.completeBookshelfList.innerHTML = "";
                this.incompleteBookshelfList.innerHTML = "";

                this._appendToContainer(book);
            })
        }, 3000);


    }

    create() {
        let id = Math.random().toString(16).slice(2);
        let title = this.inputBookTitle.value;
        let author = this.inputBookAuthor.value;
        let year = this.inputBookYear.value;
        let isCompleted = this.inputBookIsCompleted.checked;
        let error = false;

        document.querySelectorAll(".input_book").forEach((input) => {
            if (input.value === "") {
                error = true;
            } else {
                error = false;
            }
        });

        if (error === true) {
            alert("Semua data buku harus diisi!")
            return;
        }
        let book = {
            id,
            title,
            author,
            year,
            isCompleted,
        }
        let bookStore = ManageLocalStorage.store(
            book
        )
        if (bookStore) {
            this.getBooksList();
            document.querySelectorAll(".input_book").forEach((input) => input.value = "");
        }
    }

}