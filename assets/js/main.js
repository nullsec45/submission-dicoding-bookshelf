import BookEvent from "./event.js";

const root = document.querySelector("body")
const bookEvent = new BookEvent(root);

bookSubmit = document.querySelector("#bookSubmit");
window.addEventListener("load", function () {
    bookEvent.getBooksList();
});


bookSubmit.addEventListener("click", function (event) {
    event.preventDefault();
    bookEvent.create();
});

window.addEventListener("unload", function () {
    bookEvent.getBooksList();
});