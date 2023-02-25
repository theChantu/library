const ADDBOOKBTN = document.querySelector('#bookbtn');
const BOOKFORM = document.querySelector('#book-creator');
const CREATEBTN = document.querySelector('#createbtn');
const FORMCONTAINER = document.querySelector('#book-form');
const BOOKSCONTAINER = document.querySelector('#books');
const XICON = document.querySelector('#x-icon');

const AUTHORINPUT = document.querySelector('#author');
const TITLEINPUT = document.querySelector('#title');
const PAGESINPUT = document.querySelector('#pages');
const CHECKINPUT = document.querySelector('#readcheck');

let bookchecked = false;

const BOOKS = [];
let userBook = null;

// Book object
function Book(author, title, pages, read) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
}

function getCheckboxInput() {
    if (CHECKINPUT.checked) {
        bookchecked = true;
    } else {
        bookchecked = false;
    }
}

function handleReadBtn(book, readbtn) {
    if (book.read === true) {
        readbtn.classList.add('green');
        readbtn.textContent = 'Read';
    } else {
        readbtn.classList.add('red');
        readbtn.textContent = 'Not read';
    }
}
function changeReadBtn(index) {
    if (BOOKS[index].read === true) {
        BOOKS[index].read = false;
    } else if (BOOKS[index].read === false) {
        BOOKS[index].read = true;
    }
}

function changeReadColor(button) {
    if (button.classList.contains('red')) {
        button.classList.remove('red');
        button.classList.add('green');
    } else if (button.classList.contains('green')) {
        button.classList.remove('green');
        button.classList.add('red');
    }
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function renderLibrary() {
    removeAllChildNodes(BOOKSCONTAINER);
    for (let i = 0; i < BOOKS.length; i += 1) {
        renderBook(BOOKS[i]);
    }
}

function renderBook(book) {
    // Attach new book to books container
    const bookcontainer = document.createElement('div');
    bookcontainer.classList.add('book');
    BOOKSCONTAINER.appendChild(bookcontainer);

    // Attach text and button containers to book
    const bookinfo = document.createElement('div');
    bookinfo.classList.add('book-info');
    const bookbuttons = document.createElement('div');
    bookbuttons.classList.add('book-buttons');
    bookcontainer.appendChild(bookinfo);
    bookcontainer.appendChild(bookbuttons);

    // Attach text to bookinfo
    const authortext = document.createElement('p');
    const nametext = document.createElement('p');
    const pagetext = document.createElement('p');
    bookinfo.appendChild(authortext);
    bookinfo.appendChild(nametext);
    bookinfo.appendChild(pagetext);
    authortext.textContent = book.author;
    nametext.textContent = book.title;
    pagetext.textContent = book.pages;

    // Attach buttons to bookbuttons
    const readbtn = document.createElement('button');
    readbtn.classList.add('readbtn');
    handleReadBtn(book, readbtn);
    const removebtn = document.createElement('button');
    removebtn.classList.add('removebtn');
    removebtn.textContent = 'REMOVE';
    bookbuttons.appendChild(readbtn);
    bookbuttons.appendChild(removebtn);

    // Update data
    BOOKSONPAGE = document.querySelectorAll('.book');
    READBTNS = document.querySelectorAll('.readbtn');

    // Event Listeners
    readbtn.addEventListener('click', () => {
        changeReadColor(readbtn);
        changeReadBtn(BOOKS.indexOf(book));
        // Render the new BOOKS array
        renderLibrary();
    });

    removebtn.addEventListener('click', () => {
        BOOKS.splice(BOOKS.indexOf(book), 1);
        // Render the new BOOKS array
        renderLibrary();
    });
}

XICON.addEventListener('click', () => {
    BOOKFORM.style.display = 'none';
});

ADDBOOKBTN.addEventListener('click', () => {
    BOOKFORM.style.display = 'block';
});

CREATEBTN.addEventListener('click', () => {
    if (FORMCONTAINER.checkValidity()) {
        getCheckboxInput();
        userBook = new Book(
            AUTHORINPUT.value,
            TITLEINPUT.value,
            PAGESINPUT.value,
            bookchecked
        );
        BOOKS.push(userBook);
        renderBook(userBook);

        // Reset inputs in form
        FORMCONTAINER.reset();

        BOOKFORM.style.display = 'none';
    }
});
