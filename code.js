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

Book.prototype.toggleRead = function() {
    this.read = !this.read;
};

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

        const interactions = document.createElement ("div")
        interactions.classList.add("interactions")

        const trashBtn = document.createElement("button");
        trashBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M232.7 69.9L224 96L128 96C110.3 96 96 110.3 96 128C96 145.7 110.3 160 128 160L512 160C529.7 160 544 145.7 544 128C544 110.3 529.7 96 512 96L416 96L407.3 69.9C402.9 56.8 390.7 48 376.9 48L263.1 48C249.3 48 237.1 56.8 232.7 69.9zM512 208L128 208L149.1 531.1C150.7 556.4 171.7 576 197 576L443 576C468.3 576 489.3 556.4 490.9 531.1L512 208z"/></svg>`;
        trashBtn.classList.add("deleteBook");
        trashBtn.addEventListener("click", () => {
            const index = myLibrary.findIndex(b => b.id === book.id);
            if(index > -1) myLibrary.splice(index, 1);
            renderLibrary();
        });

        const btnRead = document.createElement("button");
        btnRead.textContent = "Change Status!";
        btnRead.classList.add("changeStatus");
        btnRead.addEventListener("click", () => {
            book.toggleRead(); 
            renderLibrary();
        })

        interactions.append(trashBtn, btnRead)
        card.append(bookTitle, bookAuthor, bookPages, bookId, bookStatus, interactions);
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