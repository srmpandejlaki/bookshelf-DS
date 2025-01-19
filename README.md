## Course Belajar Membuat Front-End Web untuk Pemula - Dicoding Indonesia <br>Submission: Membangun Bookshelf App

Ini adalah starter project untuk siswa yang sedang mengerjakan tugas akhir kelas Belajar Membuat Front-End Web untuk Pemula.

### Ketentuan Pengerjaan Tugas
Untuk mempermudah penilaian submission yang dikirim, Anda perlu memahami ketentuan-ketentuan berikut dalam mengerjakan tugas ini.
<ul>
  <li>Anda dilarang mengedit atau menghapus atribut `data-testid` pada elemen-elemen HTML.</li>
  <li>Ini masih berkaitan dengan poin sebelumnya. Jika Anda memiliki kebutuhan seperti styling elemen dan perlu menambahkan atribut seperti class, itu tidak dilarang selama atribut `data-testid` beserta nilainya tidak diubah atau dihapus.</li>
  <li>Dalam menampilkan data-data buku, Anda wajib memberikan beberapa atribut pada setiap elemennya.</li>
  <ul>
    <li>`data-bookid`: menampung nilai ID masing-masing buku.</li>
    <li>`data-testid`: penanda jenis data buku yang ditampilkan. Berikut daftarnya.</li>
    <ul>
      <li>`bookItem`: elemen kontainer yang menampung data-data buku.</li>
      <li>`bookItemTitle`: judul buku</li>
      <li>`bookItemAuthor`: penulis buku</li>
      <li>`bookItemYear`: tahun rilis buku</li>
      <li>`bookItemIsCompleteButton`: tombol untuk mengubah kondisi buku dari “Belum selesai dibaca” menjadi “Selesai dibaca” atau sebaliknya.</li>
      <li>`bookItemDeleteButton`: tombol untuk menghapus buku.</li>
      <li>`bookItemEditButton`: tombol untuk mengubah data buku.</li>
    </ul>
  </ul>
</ul>

Agar pengerjaan tugas lebih mudah, Anda dapat mengikuti templat buku berikut.
```html
<div data-bookid="{{ ID_buku }}" data-testid="bookItem">
  <h3 data-testid="bookItemTitle">{{ judul_buku }}</h3>
  <p data-testid="bookItemAuthor">Penulis: {{ penulis_buku }}</p>
  <p data-testid="bookItemYear">Tahun: {{ tahun_rilis_buku }}</p>
  <div>
    <button data-testid="bookItemIsCompleteButton">{{ tombol_untuk_ubah_kondisi }}</button>
    <button data-testid="bookItemDeleteButton">{{ tombol_untuk_hapus }}</button>
    <button data-testid="bookItemEditButton">{{ tombol_untuk_edit }}</button>
  </div>
</div>
```

Buatlah aplikasi web yang dapat memasukan data buku ke dalam rak, memindahkan data buku antar rak, dan menghapus data buku dari rak.

Untuk lebih jelasnya, ada lima kriteria wajib yang harus Anda penuhi.<br>

### Kriteria Wajib 1: Gunakan localStorage sebagai Penyimpanan
<ul>
  <li>Data buku yang ditampilkan pada rak-rak harus dapat bertahan walaupun halaman web ditutup. Dengan begitu, Anda harus menyimpan data buku pada localStorage.</li>
  <li>Setiap buku harus berupa objek JavaScript yang membawa beberapa data berikut. Pastikan nama properti beserta tipe data value-nya juga sesuai.</li>
</ul>

Format objek beserta tipe data nilainya.
<pre>
  {
    id: string | number,
    title: string,
    author: string,
    year: number,
    isComplete: boolean,
  }
</pre>
Berikut contoh implementasi data buku riilnya.
<pre>
  {
    id: 3657848524,
    title: 'Harry Potter and the Philosopher\'s Stone',
    author: 'J.K Rowling',
    year: 1997,
    isComplete: false,
  }
</pre>

### Kriteria Wajib 2: Mampu Menambahkan Buku
<ul>
  <li>Aplikasi harus mampu menyimpan buku baru menggunakan formulir yang telah disediakan dalam starter project.</li>
  <li>ID buku harus dihasilkan secara otomatis dan unik. Tipsnya, Anda dapat memanfaatkan timestamp sebagai nilainya. Nilai timestamp dapat diperoleh dengan kode new Date().getTime() atau Number(new Date()).</li>
  <li>Formulir setidaknya bisa menghasilkan empat data berikut.</li>
  <ul>
    <li>title: judul buku.</li>
    <li>author: penulis buku.</li>
    <li>year: tahun rilis buku bertipe number.</li>
    <li>isComplete: kondisi apakah sudah selesai dibaca atau belum.</li>
  </ul>
</ul>

### Kriteria Wajib 3: Memiliki Dua Rak Buku
<ul>
  <li>Aplikasi wajib memiliki 2 Rak buku, yakni “Belum selesai dibaca” dan “Selesai dibaca”.</li>
  <li>Rak "Belum selesai dibaca" hanya menyimpan buku-buku dengan isComplete bernilai false.</li>
  <li>Rak "Selesai dibaca" hanya menyimpan buku-buku dengan isComplete bernilai true.</li>
</ul>

### Kriteria Wajib 4: Dapat Memindahkan Buku Antar Rak
Buku-buku dalam rak harus dapat dipindahkan ke rak lainnya, baik "Belum selesai dibaca" maupun "Selesai dibaca". Pastikan perubahan ini juga tersimpan dalam localStorage.

### Kriteria Wajib 5: Dapat Menghapus Data Buku
Buku yang ditampilkan pada rak, baik itu "Belum selesai dibaca" maupun "Selesai dibaca" harus dapat dihapus. Selain menghilang dari halaman, data buku dalam localStorage juga harus terhapus.

Selain kriteria utama, ada kriteria opsional juga yang dapat Anda penuhi agar mendapat penilaian yang lebih tinggi.

### Kriteria Opsional 1: Menambahkan Fitur Pencarian Buku
Memiliki fitur pencarian buku yang telah disimpan dan ditampilkan pada rak sesuai dengan title buku yang dituliskan pada kolom pencarian.

### Kriteria Opsional 2: Menambahkan Fitur Edit Buku
Selain dapat menambahkan baru, buku-buku yang telah tersimpan diharapkan dapat diedit.

### Kriteria Opsional 3: Kode Ditulis Secara Rapi dan Bersih
Berikut beberapa indikator yang dapat dicapai agar Anda dapat menulis kode dengan rapi dan bersih.
<ul>
  <li>Bersihkan comment dan kode jika tidak digunakan.</li>
  <li>Menggunakan indentasi yang sesuai dan konsisten.</li>
  <li>Menggunakan penamaan unit (variabel dan function) sesuai dengan maknanya, baik isi nilainya ataupun tugasnya.</li>
</ul>

### Kriteria Opsional 4: Menerapkan Styling
Dalam starter project, kami hanya memberikan HTML dan JavaScript. Silakan Anda berkreasi dengan CSS untuk menciptakan tampilan yang ciamik. Namun, pastikan tetap memenuhi ketentuan HTML yang ada, ya.

Selamat mengerjakan dan sukses selalu!
