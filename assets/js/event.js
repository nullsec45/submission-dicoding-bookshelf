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

        typeNumber(this.inputBookYear);

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

        buttonIsCompleted.addEventListener("click", function () {
            alert("oke")
            if (isCompleted) {
                // addToUncompleted(id);
            } else {
                // addToCompleted(id);
            }
        })

        const buttonRemoveBook = document.createElement("button");
        buttonRemoveBook.setAttribute("class", "red");
        buttonRemoveBook.innerText = "Hapus Buku";

        buttonRemoveBook.addEventListener("click", function () {
            // removeBook();
            alert("oke")

        })

        action.append(buttonIsCompleted);
        action.append(buttonRemoveBook);

        container.append(action);

        return container;
    }

    _appendToContainer(book) {
        if (book.isCompleted) {
            this.completeBookshelfList.append(this._renderElementBook(book));
        } else {
            this.incompleteBookshelfList.append(this._renderElementBook(book));

        }
    }
    get getBooksList() {
        this.incompleteBookshelfList.innerHTML = "";
        this.completeBookshelfList.innerHTML = "";
        if (ManageLocalStorage.isStorageExists) {

            ManageLocalStorage.index.forEach((book) => {
                this._appendToContainer(book);
            });

        }
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
            this._appendToContainer(book);
            document.querySelectorAll(".input_book").forEach((input) => input.value = "");
        }
    }

}