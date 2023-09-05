import { typeNumber } from "./utils.js";
import ManageLocalStorage from "./data.js";


export default class BookEvent {
    constructor(root) {
        this.root = root;
        this.inputBookTitle = this.root.querySelector("#inputBookTitle");
        this.inputBookAuthor = this.root.querySelector("#inputBookAuthor");
        this.inputBookYear = this.root.querySelector("#inputBookYear");
        this.inputPage = this.root.querySelector("#inputPage");
        this.inputBookIsComplete = this.root.querySelector("#inputBookIsComplete");

        this.incompleteBookshelfList = this.root.querySelector("#incompleteBookshelfList");
        typeNumber(this.inputBookYear);
        typeNumber(this.inputPage);

        ManageLocalStorage.setLocalStorage;
        ManageLocalStorage.DATA_BOOKS_LENGTH;


    }

    getBooksList() {
        return ManageLocalStorage.index;
    }

    create() {
        let isComplete = this.inputBookIsComplete.checked == true ? true : false;
        const title = this.inputBookTitle.value;
        const author = this.inputBookAuthor.value;
        const year = this.inputBookYear.value;
        const page = this.inputPage.value;


        ManageLocalStorage.store(
            title,
            author,
            year,
            isComplete,
            page
        )
        // alert("Buku berhasil ditambahkan");
    }

}