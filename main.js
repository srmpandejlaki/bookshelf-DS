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
    return +new Date();
  }

  // function untuk membuat objek buku
  function generateBookObject(id, judul, penulis, tahun, isCompleted) {
    return { id, judul, penulis, tahun, isCompleted };
  }

  // function untuk menampilkan data buku
  document.addEventListener(RENDER_EVENT, function () {
    console.log(shelf);
  });
});
