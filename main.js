document.addEventListener("DOMContentLoaded", function () {
  const shelf = [];
  const RENDER_EVENT = "render-book";

  // simpan data buku yang diinput
  const submitBook = document.getElementById("bookForm");
  submitBook.addEventListener("submit", function (event) {
    event.preventDefault();
    addBook();
  });

  // function untuk tambah buku
  function addBook() {
    const title = document.getElementById("booFormTitle").value;
    const author = document.getElementById("bookFormAuthor").value;
    const year = document.getElementById("bookFormYear").value;
    const checklist = document.getElementById("bookFormIsComplete").value;

    const generateId = generateID();
    const bookObject = generateBookObject(
      generateId,
      title,
      author,
      year,
      checklist
    );
    shelf.push(bookObject);
  }

  // render data
  document.dispatchEvent(new Event(RENDER_EVENT));
});
