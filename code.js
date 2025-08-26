const myLibrary = [];

function Book(title, author, pages, read) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor")
    }
    this.id = crypto.randomUUID();
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.read = read,

    this.info = function() {
        let readStatus = this.read ? "already read" : "not read yet";
        return `${this.title} by ${this.author}, ${this.pages} pages, ${readStatus}`;
    }
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