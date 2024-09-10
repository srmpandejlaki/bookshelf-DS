document.addEventListener("DOMContentLoaded", function () {
  const shelf = [];
  const RENDER_EVENT = "render-book";

  // simpan data buku yang diinput
  const submitBook = document.getElementById("bookForm");
  submitBook.addEventListener("bookFormSubmit", function (event) {
    event.preventDefault();
    addBook();
  });

  // function untuk tambah buku - WAJIB #2
  function addBook() {
    const title = document.getElementById("bookFormTitle").value;
    const author = document.getElementById("bookFormAuthor").value;
    const year = document.getElementById("bookFormYear").value;

    const generateId = generateID();
    const bookObject = generateBookObject(
      generateId,
      title,
      author,
      year,
      false
    );
    shelf.push(bookObject);

    // render data
    document.dispatchEvent(new Event(RENDER_EVENT));
  }

  // function untuk membuat id unik
  function generateID() {
    return +new Date().getTime();
  }

  // function untuk membuat objek buku
  function generateBookObject(id, judul, penulis, tahun, isCompleted) {
    return { id, judul, penulis, tahun, isCompleted };
  }

  // function untuk menampilkan data buku
  document.addEventListener(RENDER_EVENT, function () {
    console.log(shelf);
  });

  //function membuat book-list
  function makeBook(bookObject) {
    const textTitle = document.createElement("h3");
    textTitle.innerHTML = bookObject.title;
    textTitle.setAttribute("data-testid", "bookItemTitle");

    const textAuthor = document.createElement("p");
    textAuthor.innerHTML = bookObject.author;
    textAuthor.setAttribute("data-testid", "bookItemAuthor");

    textYear.innerHTML = bookObject.year;
    const textYear = document.createElement("p");
    textYear.setAttribute("data-testid", "bookItemYear");

    const textContainer = document.createElement("div");
    textContainer.append(textTitle, textAuthor, textYear);
    textContainer.setAttribute("data-testid", "bookItem");

    const container = document.createElement("div");
    textContainer.setAttribute("data-testid", "incompleteBookList");
    container.append(textContainer);
    container.setAttribute("databook-id", `list-${bookObject.id}`);

    // button-button
    if (bookObject.isCompleted) {
      // undo button
      const undoButton = document.createElement("button");
      undoButton.classList.add("bookItemIsCompleteButton");

      undoButton.addEventListener("click", function () {
        undoBook(bookObject.id);
      });

      // hapus button
      const deleteButton = document.createElement("button");
      deleteButton.classList.add("bookItemDeleteButton");

      deleteButton.addEventListener("click", function () {
        deleteBook(bookObject.id);
      });

      container.append(undoButton, deleteButton);

      // edit button
    } else {
      // 'belum selesai dibaca' -> 'selesai dibaca'
      const doneButton = document.createElement("button");
      doneButton.classList.add("done-button");

      doneButton.addEventListener("click", function () {
        doneBook(bookObject.id);
      });
      container.append(doneButton);

      // function doneBook
      function doneBook(idBook) {
        const bookTarget = findBook(idBook);

        if (bookTarget == null) return;

        bookTarget.isCompleted = true;
        document.dispatchEvent(new Event(RENDER_EVENT));
        saveData();
      }
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

    // function hapus book dari list selesai
    function deleteBook(idBook) {
      const bookTarget = findBookIndex(idBook);

      if (bookTarget === -1) return;

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

    return container;
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

  if (isstorageExist()) {
    loadDataFromStorage();
  }
});
