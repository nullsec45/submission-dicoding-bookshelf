export default class BookEvent {
    constructor(root) {
        this.root = root;
        this.inputBookTitle = this.root.querySelector("#inputBookTitle");
        this.inputBookAuthor = this.root.querySelector("#inputBookAuthor");
        this.inputBookYear = this.root.querySelector("#inputBookYear");
        this.inputPage = this.root.querySelector("#inputPage");

        this.incompleteBookshelfList = this.root.querySelector("#incompleteBookshelfList");
    }

    saveData() {

    }

}