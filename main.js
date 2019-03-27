let myLibrary = [];
let first = new Book('Tom Sawyer', 'Mark Twain', '120', 'Read');
let second = new Book('Oldman and the Sea', 'Ernest Hemingway', '320', 'UnRead');
myLibrary.push(first);
myLibrary.push(second);
let bookName = document.querySelector('.book-name');
let author = document.querySelector('.author');
let pages = document.querySelector('.pages');
let read = document.querySelector('#read');
let validateBook = bookName.parentNode.nextElementSibling;
let validateAuthor = author.parentNode.nextElementSibling;
let validateAPages = pages.parentNode.nextElementSibling;
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
    add.insertAdjacentHTML("beforeend", `<div class="card column" data-remove="${myLibrary.length - 1}" style="width: 32%; display: inline-block;margin: 5px;">
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
                        <a class="button is-fullwidth togg" id="${myLibrary.length - 1}" data-tog="${myLibrary.length - 1}" onclick="toggR(${myLibrary.length - 1})">${this.read}</a>
                    </footer>
                </div>`);
    renderDelete();
}
Book.prototype.togggleRead = function () {
    if (this.read === 'Read') {
        this.read = 'UnRead';
    } else {
        this.read = 'Read';
    }
    
}

function addBookToLibrary(book) {
    myLibrary.push(book);
    book.addStuff();
}

function formInput() {
    let error = "Can't be Empty";
    validateForm(bookName.value, author.value, pages.value);
    if (validateBook.textContent === error || validateAuthor.textContent === error ||
        validateAPages.textContent === error) {
        return;
    }
    let book = new Book(bookName.value, author.value, pages.value, read.innerText);
    resetForm();
    addBookToLibrary(book);
}

function render() {
    for (let [i, data] of myLibrary.entries()) {
        add.insertAdjacentHTML("beforeend", `<div class="card column" data-remove="${i}" style="width: 32%; display: inline-block;margin: 5px;">
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
                        <a class="button is-fullwidth read" id="${i}" data-tog="${i}">${data.read}</a>
                    </footer>
                </div>`);
    }

    renderDelete();

}

function renderDelete() {
    let del = document.querySelectorAll(".delete");
    del.forEach((button) => {
        button.addEventListener('click', removeBook);
    })

    function removeBook() {
        let toDelete = document.querySelector(`[data-remove="${this.id}"]`);
        toDelete.style.display = 'none';
        myLibrary[this.id] = null;
    }
}


// Validations
function validateForm(book, authorName, bookPages) {
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

function resetForm() {
    bookName.value = '';
    author.value = '';
    pages.value = '';
    read.textContent = "Read";
    read.classList.add('is-success');
    read.classList.remove('is-warning');
}

function toggR(a){
    myLibrary[a].togggleRead();

    setTimeout(() => {
            const readUnreadSingle = document.querySelector(`[data-tog="${a}"]`);
            let c = myLibrary[a].read;
            readUnreadSingle.textContent = c;
        },
        0)
}



function searchBook(a) {
    myLibrary[a].togggleRead();

    setTimeout(() => {
            const readUnreadSingle = document.querySelector(`[data-tog="${a}"]`);
            let c = myLibrary[a].read;
            readUnreadSingle.textContent = c;
        },
        0)
}
window.onload = () => {
    const readUnread = document.querySelectorAll('.read');
    readUnread.forEach(function (read) {
        read.addEventListener('click', function () {
            searchBook(this.id);

        })
    })
}