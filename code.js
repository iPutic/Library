const myLibrary = [];

function Book(title, author, pages, read) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
const islandsInTheNet = new Book("Islands in the Net", "Bruce Sterling", 396, true);
const theLightningThief = new Book("The Lightning Thief", "Rick Riordan", 377, false);
const mrPresident = new Book("Mr. President", "Miguel Ángel Asturias", 320, false);

myLibrary.push(theHobbit, islandsInTheNet, theLightningThief, mrPresident);

function renderLibrary() {
    const libraryContainer = document.querySelector(".content");
    libraryContainer.innerHTML = "";

    const dialog = document.querySelector("#addBookModal");

    const addCard = document.createElement("div");
    addCard.classList.add("card", "addCard");
    addCard.textContent = `+`;

    addCard.addEventListener("click", () => {
        dialog.showModal();
    });

    libraryContainer.appendChild(addCard);

    myLibrary.forEach(book => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.id = book.id;

        const bookTitle = document.createElement("h2");
        bookTitle.textContent = book.title;

        const bookAuthor = document.createElement("h3");
        bookAuthor.textContent = book.author;

        const bookPages = document.createElement("p");
        bookPages.textContent = `${book.pages} pages`;

        const bookId = document.createElement("p");
        bookId.textContent = `ID: ${book.id}`;
        bookId.classList.add("id");

        const bookStatus = document.createElement("p");
        if (book.read === "on" || book.read === true) {
            bookStatus.classList.add("read");
            bookStatus.textContent = "Read";
        } else {
            bookStatus.classList.add("toRead");
            bookStatus.textContent = "Not read yet";
        }

        card.append(bookTitle, bookAuthor, bookPages, bookId, bookStatus);
        libraryContainer.appendChild(card);
    });
}

const dialog = document.querySelector("#addBookModal");
const form = document.querySelector("#addBookForm");

form.querySelector("button[type='reset']").addEventListener("click", () => {
    dialog.close();
});

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const book = Object.fromEntries(data.entries());

    const newBook = new Book(
        book.title,
        book.author,
        book.pages,
        book.read === "on"
    );

    myLibrary.push(newBook);

    form.reset();
    dialog.close();
    renderLibrary();
});

renderLibrary();

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
});