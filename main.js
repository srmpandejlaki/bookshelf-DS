document.addEventListener("DOMContentLoaded", function () {
  const shelf = [];
  const RENDER_EVENT = "render-book";

  // simpan data buku yang diinput
  const submitBook = document.getElementById("bookForm");
  submitBook.addEventListener("submit", function (event) {
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

  // function simpan data ke local storage - WAJIB 1#
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

  //function membuat book-list
  function makeBook(bookObject) {
    const textTitle = document.createElement("h3");
    textTitle.innerHTML = bookObject.title;

    const textAuthor = document.createElement("p");
    textAuthor.innerHTML = `Penulis: ${bookObject.author}`;

    const textYear = document.createElement("p");
    textYear.innerHTML = `Tahun: ${bookObject.year}`;

    const textContainer = document.createElement("div");
    textContainer.classList.add("book");
    textContainer.append(textTitle, textAuthor, textYear);

    const container = document.createElement("div");
    container.classList.add("book-list");
    container.append(textContainer);
    container.setAttribute("id", `list-${bookObject.id}`);

    // button-button
    if (bookObject.isCompleted) {
      // undo button
      const undoButton = document.createElement("button");
      undoButton.classList.add("undo-button");

      undoButton.addEventListener("click", function () {
        undoBook(bookObject.id);
      });

      // hapus button
      const deleteButton = document.createElement("button");
      deleteButton.classList.add("delete-button");

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
  }
});
