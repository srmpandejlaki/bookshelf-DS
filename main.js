document.addEventListener("DOMContentLoaded", function () {
  // simpan data buku yang diinput
  const submitBook = document.getElementById("bookForm");
  submitBook.addEventListener("submit", function (event) {
    event.preventDefault();
    addBook();
  });
  if (isstorageExist()) {
    loadDataFromStorage();
  }
});

let shelf = [];
const RENDER_EVENT = "render-book";

// function untuk tambah buku - WAJIB #2
function addBook() {
  const judul = document.getElementById("bookFormTitle").value;
  const penulis = document.getElementById("bookFormAuthor").value;
  const tahun = Number(document.getElementById("bookFormYear").value);
  const isCompleted = document.getElementById("bookFormIsComplete").checked;

  const generateId = generateID();
  const bookObject = generateBookObject(
    generateId,
    judul,
    penulis,
    tahun,
    isCompleted
  );
  shelf.push(bookObject);
  console.log("hello");
  // render data
  document.dispatchEvent(new Event(RENDER_EVENT));
  document.getElementById("bookForm").reset();
  saveData();
}

// function untuk membuat id unik
function generateID() {
  return +new Date();
}

// function untuk membuat objek buku
function generateBookObject(id, title, author, year, isCompleted) {
  return { id, title, author, year, isCompleted };
}

// function untuk menampilkan data buku
// document.addEventListener(RENDER_EVENT, function () {
//   console.log(shelf);
// });

//function membuat book-list
function makeBook(bookObject) {
  const textTitle = document.createElement("h3");
  textTitle.innerHTML = bookObject.title;
  textTitle.setAttribute("data-testid", "bookItemTitle");

  const textAuthor = document.createElement("p");
  textAuthor.innerHTML = bookObject.author;
  textAuthor.setAttribute("data-testid", "bookItemAuthor");

  const textYear = document.createElement("p");
  textYear.innerHTML = bookObject.year;
  textYear.setAttribute("data-testid", "bookItemYear");

  const textContainer = document.createElement("div");
  textContainer.append(textTitle, textAuthor, textYear);

  const buttonContainer = document.createElement("div");

  const container = document.createElement("div");
  container.append(textContainer, buttonContainer);
  container.setAttribute("data-bookid", `${bookObject.id}`);
  container.setAttribute("data-testid", "bookItem");

  // hapus button
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "delete";
  deleteButton.setAttribute("data-testid", "bookItemDeleteButton");

  deleteButton.addEventListener("click", function () {
    deleteBook(bookObject.id);
  });

  // edit button
  const editButton = document.createElement("button");
  editButton.innerText = "edit";
  editButton.setAttribute("data-testid", "bookItemEditButton");

  editButton.addEventListener("click", function () {
    editBook(bookObject.id);
  });

  // button-button
  if (bookObject.isCompleted) {
    // undo button
    const undoButton = document.createElement("button");
    undoButton.setAttribute("data-testid", "bookItemUndoButton");
    undoButton.innerText = "undo";

    undoButton.addEventListener("click", function () {
      undoBook(bookObject.id);
    });

    buttonContainer.append(undoButton, deleteButton, editButton);
  } else {
    // 'belum selesai dibaca' -> 'selesai dibaca'
    const doneButton = document.createElement("button");
    doneButton.setAttribute("data-testid", "bookItemIsCompleteButton");
    doneButton.innerText = "done";

    doneButton.addEventListener("click", function () {
      doneBook(bookObject.id);
    });

    // function doneBook
    function doneBook(idBook) {
      const bookTarget = findBook(idBook);

      if (bookTarget == null) return;

      bookTarget.isCompleted = true;
      document.dispatchEvent(new Event(RENDER_EVENT));
      saveData();
    }
    buttonContainer.append(doneButton, deleteButton, editButton);
  }

  return container;
}

// function temukan book
function findBook(idBook) {
  for (const book of shelf) {
    if (book.id === idBook) {
      return book;
    }
  }
  return null;
}

function deleteBook(idBook) {
  const bookTarget = findBookIndex(idBook);

  if (bookTarget === -1) return;

  shelf.splice(bookTarget, 1);
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function undoBook(idBook) {
  const bookTarget = findBook(idBook);

  if (bookTarget == null) return;

  bookTarget.isCompleted = false;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

// function edit
function editBook(idBook) {
  const bookTarget = findBookIndex(idBook);

  if (bookTarget == -1) return;

  const title = document.getElementById("bookFormTitle");
  const author = document.getElementById("bookFormAuthor");
  const year = document.getElementById("bookFormYear");
  const isCompleted = document.getElementById("bookFormIsComplete");
  title.value = shelf[bookTarget].title;
  author.value = shelf[bookTarget].author;
  year.value = shelf[bookTarget].year;
  isCompleted.checked = shelf[bookTarget].isCompleted;

  shelf.splice(bookTarget, 1);
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

// implementasi findBookIndex()
function findBookIndex(idBook) {
  for (const index in shelf) {
    if (shelf[index].id === idBook) {
      return index;
    }
  }
  return -1;
}

// function search book
const searchBar = document.getElementById("searchBook");
searchBar.addEventListener("submit", function (event) {
  event.preventDefault();

  const inputSearch = event.target.elements.searchBookTitle.value.toLowerCase();
  const shelfFilter = shelf.filter((book) =>
    book.title.toLowerCase().includes(inputSearch)
  );

  if (shelfFilter.length) {
    search(shelfFilter);
  } else {
    document.dispatchEvent(new Event(RENDER_EVENT));
  }
  event.target.reset();
});
function search(shelfFilter) {
  const unreadBook = document.getElementById("incompleteBookList");
  unreadBook.innerHTML = "";

  const readBook = document.getElementById("completeBookList");
  readBook.innerHTML = "";

  for (const bookItem of shelfFilter) {
    const bookElement = makeBook(bookItem);
    if (!bookItem.isCompleted) {
      unreadBook.append(bookElement);
    } else {
      readBook.append(bookElement);
    }
  }
}

// function simpan data ke local storage - WAJIB 1#
document.addEventListener(RENDER_EVENT, function () {
  const unreadBook = document.getElementById("incompleteBookList");
  unreadBook.innerHTML = "";

  const readBook = document.getElementById("completeBookList");
  readBook.innerHTML = "";

  for (const bookItem of shelf) {
    const bookElement = makeBook(bookItem);
    if (!bookItem.isCompleted) {
      unreadBook.append(bookElement);
    } else {
      readBook.append(bookElement);
    }
  }
});

function saveData() {
  if (isstorageExist()) {
    const parsed = JSON.stringify(shelf);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event(SAVED_EVENT));
  }
}

const SAVED_EVENT = "shelf-tersimpan";
const STORAGE_KEY = "BOOK-SHELF_APP";

function isstorageExist() {
  if (typeof Storage === undefined) {
    alert("Browser tidak mendukung local storage");
    return false;
  }
  return true;
}

document.addEventListener(SAVED_EVENT, function () {
  console.log(localStorage.getItem(STORAGE_KEY));
});

function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(serializedData);

  if (data !== null) {
    for (const shelfs of data) {
      shelf.push(shelfs);
    }
  }
  document.dispatchEvent(new Event(RENDER_EVENT));
}
