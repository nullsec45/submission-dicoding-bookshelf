import BookEvent from "./event.js";

const bookEvent = new BookEvent();

window.addEventListener("load", function () {
    bookEvent.getBooksList();
});
bookEvent.bookSubmit.addEventListener("click", function (event) {
    event.preventDefault()
    bookEvent.create();
});

bookEvent.inputBookIsCompleted.addEventListener("click", function () {
    if (this.checked) {
        bookEvent.textButtonSubmit.innerText = "Sudah";
    } else {
        bookEvent.textButtonSubmit.innerText = "Belum";
    }
})

bookEvent.searchSubmit.addEventListener("click", function (event) {
    event.preventDefault();
    bookEvent.searchBook();
})
