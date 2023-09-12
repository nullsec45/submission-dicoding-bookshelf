import { typeNumber } from "./utils.js";
import ManageLocalStorage from "./data.js";


export default class BookEvent {
    constructor() {
        this.inputBookTitle = document.querySelector("#input_book_title");
        this.inputBookAuthor = document.querySelector("#input_book_author");
        this.inputBookYear = document.querySelector("#input_book_year");
        this.inputBookIsComplete = document.querySelector("#input_book_is_complete");

        this.incompleteBookshelfList = document.getElementById("incomplete_bookshelf_list");
        this.completeBookshelfList = document.getElementById("complete_bookshelf_list");
        this.bookSubmit = document.querySelector("#book_submit");
        this.textButtonSubmit = document.querySelector("#text_button_submit");
        this.searchSubmit = document.querySelector("#search_submit");
        this.searchBookTitle = document.querySelector("#search_book_title");
        this.emptyBook = document.querySelector("#empty_book");
        this.emptyBookTitle = this.emptyBook.querySelector("#title");
        this.containerInComplete = document.querySelector("#incomplete_container");
        this.containerComplete = document.querySelector("#complete_container");


        typeNumber(this.inputBookYear);

    }
    _addToUncomplete(bookId) {
        let book = ManageLocalStorage.findBook(bookId);
        book.isComplete = false;

        ManageLocalStorage.isComplete(book);
        this.getBooksList();
    }

    _addToComplete(bookId) {
        let book = ManageLocalStorage.findBook(bookId);
        book.isComplete = true;

        ManageLocalStorage.isComplete(book);
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
        let { id, title, author, year, isComplete } = bookObject;

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


        const buttonIsComplete = document.createElement("button");
        buttonIsComplete.setAttribute("class", "green");
        buttonIsComplete.innerText = `${isComplete == true ? "Belum selesai dibaca" : "Selesai dibaca"}`;

        buttonIsComplete.addEventListener("click", () => {
            if (isComplete) {
                this._addToUncomplete(id);
            } else {
                this._addToComplete(id);
            }
        })

        const buttonRemoveBook = document.createElement("button");
        buttonRemoveBook.setAttribute("class", "red");
        buttonRemoveBook.innerText = "Hapus Buku";

        buttonRemoveBook.addEventListener("click", () => {
            this._removeBook(id);
        })

        action.append(buttonIsComplete);
        action.append(buttonRemoveBook);

        container.append(action);

        return container;
    }

    _appendToContainer(book) {
        let bookElement = this._renderElementBook(book);

        if (book.isComplete) {
            this.containerComplete.style.display = "block";
            this.completeBookshelfList.appendChild(bookElement);
        } else {
            this.containerInComplete.style.display = "block";
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
                this.containerComplete.style.display = "none";
                this.containerInComplete.style.display = "none";
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
        this.containerComplete.style.display = "none";
        this.containerInComplete.style.display = "none";


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
        let year = parseInt(this.inputBookYear.value);
        let isComplete = this.inputBookIsComplete.checked;
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
            isComplete,
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