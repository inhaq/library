let myLibrary = [{name: "book", author: "dfsdf", pages: "23", read: "UnRead"},
    {name: "dsds", author: "dfsdf", pages: "23", read: "UnRead"}];

let bookName = document.querySelector('.book-name');
let author = document.querySelector('.author');
let pages = document.querySelector('.pages');
let read = document.querySelector('#read');

let add = document.querySelector(".adder");

let saveBook = document.getElementById('save');
saveBook.addEventListener('click', formInput);

read.addEventListener('click', toggleRead);

document.addEventListener('DOMContentLoaded', render);


function Book(name, author, pages, read) {
    // the constructor...
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.addStuff = function () {
    add.insertAdjacentHTML("beforeend", `<div class="card column" data-remove="${myLibrary.length - 1}" style="width: 33%; display: inline-block;">
                    <header class="card-header" >
                        <p class="card-header-title">
                            ${this.name}
                        </p>
                        <a href="#" class="card-footer-item delete" id="${myLibrary.length - 1}">Delete</a>
                        </a>
                    </header>
                    <div class="card-content">
                        <div class="content">
                            ${this.author} <br>
                            ${this.pages}
                        </div>
                    </div>
                    <footer class="card-footer">
                        <a class="button is-fullwidth read">${this.read}</a>
                    </footer>
                </div>`);
    renderDelete();
}


function addBookToLibrary(book) {
    // do stuff here
    myLibrary.push(book);
    book.addStuff();
}

function formInput() {

    validateForm(bookName.value, author.value, pages.value);
    if (bookName.textContent !== '' || author.textContent !== ''
        || pages.textContent !== '') {
        // return;
    }
    let book = new Book(bookName.value, author.value, pages.value, read.innerText);
    // console.log(book);
    addBookToLibrary(book);
}

function render() {

    for (let [i, data] of myLibrary.entries()) {
        add.insertAdjacentHTML("beforeend", `<div class="card column" data-remove="${i}" style="width: 33%; display: inline-block;">
                    <header class="card-header" >
                        <p class="card-header-title">
                            ${data.name}
                        </p>
                        <a href="#" class="card-footer-item delete" id="${i}">Delete</a>
                        </a>
                    </header>
                    <div class="card-content">
                        <div class="content">
                            ${data.author} <br>
                            ${data.pages}
                        </div>
                    </div>
                    <footer class="card-footer">
                        <a class="button is-fullwidth read">${data.read}</a>
                    </footer>
                </div>`);
    }

    renderDelete();
}

function renderDelete() {
    let del = document.querySelectorAll(".delete");
    // console.log(del);
    del.forEach((button) => {
        button.addEventListener('click', removeBook);
    })

    function removeBook() {
        // delete node
        let toDelete = document.querySelector(`[data-remove="${this.id}"]`);
        toDelete.style.display = 'none';
        // delete from array
        myLibrary.splice(this.id, 1);
    }
}


// Validations
function validateForm(book, authorName, bookPages) {
    let validateBook = bookName.parentNode.nextElementSibling;
    let validateAuthor = author.parentNode.nextElementSibling;
    let validateAPages = pages.parentNode.nextElementSibling;
    let error = "Can't be Empty";

    if (book === '') {
        validateBook.textContent = error;
    } else {
        validateBook.textContent = '';
    }
    if (authorName === '') {
        validateAuthor.textContent = error;
    } else {
        validateAuthor.textContent = '';
    }
    if (bookPages === '') {
        validateAPages.textContent = error;
    } else {
        validateAPages.textContent = '';
    }
}

function toggleRead() {
    if (this.textContent === "Read") {
        this.textContent = "UnRead";
        this.classList.add('is-warning');
        this.classList.remove('is-success');
    } else if (this.textContent === "UnRead") {
        this.textContent = "Read";
        this.classList.add('is-success');
        this.classList.remove('is-warning');
    }
}