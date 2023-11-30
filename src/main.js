// app.js
const unfinishedBooksShelf = document.getElementById("unfinished-books");
const finishedBooksShelf = document.getElementById("finished-books");
const unfinishedBookList = document.getElementById("unfinished-book-list");
const finishedBookList = document.getElementById("finished-book-list");
const addBookForm = document.getElementById("add-book-form");
const searchInput = document.getElementById("searchBookTitle");
const searchButton = document.getElementById("searchSubmit");

let books = [];

function searchBooks() {
  const searchInput = document.getElementById("searchBookTitle");
  const searchTerm = searchInput.value.toLowerCase();
  const bookList = document.getElementById("bookList");
  bookList.innerHTML = "";

  const matchingBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm)
  );

  matchingBooks.forEach((book) => {
    const li = document.createElement("li");
    li.textContent = `${book.title} - ${book.writer}`;
    bookList.appendChild(li);
  });
}

function loadBooksFromLocalStorage() {
  const storedBooks = localStorage.getItem("books");
  if (storedBooks) {
    books = JSON.parse(storedBooks);
    renderBooks();
  }
}

// Add book form submit event listener
addBookForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const titleInput = document.getElementById("title");
  const writerInput = document.getElementById("writer");
  const yearInput = document.getElementById("year");
  const isCompleteInput = document.getElementById("isComplete").checked;

  const newBook = {
    id: +new Date(),
    title: titleInput.value,
    writer: writerInput.value,
    year: parseInt(yearInput.value),
    isComplete: isCompleteInput,
  };

  books.push(newBook);
  updateLocalStorage();
  renderBooks();

  titleInput.value = "";
  writerInput.value = "";
  yearInput.value = "";
  isCompleteInput.value = "";
});

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
    bookItem.classList.add("book-item");

    const bookInfo = document.createElement("div");
    const bookTitle = document.createElement("h3");
    bookTitle.textContent = book.title;
    const bookWriter = document.createElement("p");
    bookWriter.textContent = `Writer: ${book.writer}`;
    const bookYear = document.createElement("p");
    bookYear.textContent = `Year: ${book.year}`;

    bookInfo.appendChild(bookTitle);
    bookInfo.appendChild(bookWriter);
    bookInfo.appendChild(bookYear);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      const confirm = window.confirm(
        "Are you sure you want to delete this book?"
      );

      if (confirm) {
        deleteBook(book.id);
      }
    });

    const moveButton = document.createElement("button");
    moveButton.textContent = book.isComplete
      ? "Move to Unfinished"
      : "Move to Finished";
    moveButton.addEventListener("click", () => {
      moveBook(book.id);
    });

    deleteButton.classList.add("red");
    moveButton.classList.add("green");

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
  const storedBooks = localStorage.getItem("books");
  if (storedBooks) {
    books = JSON.parse(storedBooks);
    renderBooks();
  }
}

loadBooksFromLocalStorage();


