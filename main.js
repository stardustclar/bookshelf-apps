// app.js
const unfinishedBooksShelf = document.getElementById("unfinished-books");
const finishedBooksShelf = document.getElementById("finished-books");
const unfinishedBookList = document.getElementById('unfinished-book-list');
const finishedBookList = document.getElementById('finished-book-list');
const addBookForm = document.getElementById("add-book-form");
const searchInput = document.getElementById("searchBookTitle");
const searchButton = document.getElementById("searchSubmit");

let books = [];


//Search
searchButton.addEventListener("click", function() {
  const searchTerm = searchBookTitle.value;
  performSearch(searchTerm)
})

// Add book form submit event listener
addBookForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const titleInput = document.getElementById("title");
  const authorInput = document.getElementById("author");
  const yearInput = document.getElementById("year");
  const isCompleteInput = document.getElementById("isComplete");

  const isCompleteValue = isCompleteInput.value === "true" ? false : true;

  const newBook = {
    id: +new Date(),
    title: titleInput.value,
    author: authorInput.value,
    year: parseInt(yearInput.value),
    isComplete: isCompleteValue
  };

  books.push(newBook);
  updateLocalStorage();
  renderBooks();

  titleInput.value = "";
  authorInput.value = "";
  yearInput.value = "";
  isCompleteInput.value = "";
});


function performSearch(searchTerm) {
  const storedBooks = localStorage.getItem('books')
  const books = JSON.parse(storedBooks) || []

  const lowerCaseSearchTerm = searchTerm.toLowerCase()
  const searchResults = books.filter((book) => {
    const lowerCaseTitle = book.title.toLowerCase()

    return lowerCaseTitle.includes(lowerCaseSearchTerm)
  })
  console.log(localStorage.getItem('books'));
}

function renderBooks() {
  const unfinishedBooksShelf = document.getElementById("unfinished-books");
  const finishedBooksShelf = document.getElementById("finished-books");
  if (!unfinishedBooksShelf || !finishedBooksShelf) {
    console.error("One or more bookshelves not found!");
    return;
  }
  
  unfinishedBooksShelf.innerHTML = "";
  finishedBooksShelf.innerHTML = "";

  books.forEach((book) => {
    
    const bookItem = document.createElement("article");
    bookItem.classList.add('book-item'); 

    const bookInfo = document.createElement('div');
    const bookTitle = document.createElement('h3');
    bookTitle.textContent = book.title;
    const bookAuthor = document.createElement('p');
    bookAuthor.textContent = `Author: ${book.author}`;
    const bookYear = document.createElement('p');
    bookYear.textContent = `Year: ${book.year}`;

    bookInfo.appendChild(bookTitle);
    bookInfo.appendChild(bookAuthor);
    bookInfo.appendChild(bookYear);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      deleteBook(book.id);
    });

    const moveButton = document.createElement('button');
    moveButton.textContent = book.isComplete ? 'Move to Unfinished' : 'Move to Finished';
    moveButton.addEventListener('click', () => {
      moveBook(book.id);
    });

    bookItem.appendChild(bookInfo);
    bookItem.appendChild(deleteButton);
    bookItem.appendChild(moveButton);

    if (book.isComplete) {
      finishedBooksShelf.appendChild(bookItem);
    } else {
      unfinishedBooksShelf.appendChild(bookItem);
    }
  });
}

function moveBook(bookId) {
  const bookIndex = books.findIndex((book) => book.id === bookId);
  if (bookIndex !== -1) {
    books[bookIndex].isComplete = !books[bookIndex].isComplete;
    updateLocalStorage();
    renderBooks();
  }
}

function deleteBook(bookId) {
  books = books.filter((book) => book.id !== bookId);
  updateLocalStorage();
  renderBooks();
}

function updateLocalStorage() {
  localStorage.setItem("books", JSON.stringify(books));
}

function loadBooksFromLocalStorage() {
  const storedBooks = localStorage.getItem('books')
  if (storedBooks) {
    books = JSON.parse(storedBooks)
    renderBooks()
  }
}

loadBooksFromLocalStorage()