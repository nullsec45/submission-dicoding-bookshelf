
const STORAGE_KEY = "BOOKS_SELF";
let DATA_BOOKS = [];

function setDataBooks(data) {
    DATA_BOOKS = data
}

export { STORAGE_KEY, DATA_BOOKS, setDataBooks }