const myLibrary = [];

function Book(title, author, pages, read) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor")
    }
    this.id = crypto.randomUUID();
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.read = read
}

function addBookToLibrary() {
    let title = prompt ("Enter the title of the book", "");
    let author = prompt ("Enter the title of the book", "");
    let pages = prompt ("Enter the title of the book", "");
    let read = confirm("Confirm if read cancle if not");
    let book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
const islandsInTheNet = new Book("Islands in the Net", "Bruce Sterling", 396, true);
const theLightningThief = new Book("The Lightning Thief", "Rick Riordan", 377, false);
const mrPresident = new Book("Mr. President", "Miguel Ángel Asturias", 320, false);

myLibrary.push(theHobbit, islandsInTheNet, theLightningThief, mrPresident);

const libraryContainer = document.querySelector(".content");

myLibrary.forEach(book => {

    const card = document.createElement("div");
    card.classList.add("card");

    const bookTitle = document.createElement("h2");
    bookTitle.textContent = book.title;

    const bookAuthor = document.createElement("h3");
    bookAuthor.classList.add("author");
    bookAuthor.textContent = book.author;

    const bookPages = document.createElement("p")
    bookPages.textContent = `${book.pages} pages`;

    const bookId = document.createElement ("p")
    bookId.textContent = `ID: ${book.id}`
    bookId.classList.add("id")

    const bookStatus = document.createElement ("p")
    if (book.read === true) {
        bookStatus.classList.add("read");
        bookStatus.textContent = "Read";
    } else if (book.read != true) {
        bookStatus.classList.add("toRead");
        bookStatus.textContent = "Not read yet";
    }

    card.appendChild(bookTitle);
    card.appendChild(bookAuthor);
    card.appendChild(bookPages);
    card.appendChild(bookId);
    card.appendChild(bookStatus);

    libraryContainer.appendChild(card);
})

function applyTheme(theme) {
    document.body.classList.remove('light', 'dark');

    setTimeout(() => {
        document.body.classList.add(theme);
        localStorage.setItem('theme', theme);
    }, 50);
}

document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        applyTheme(prefersDark ? 'dark' : 'light');
    }
})