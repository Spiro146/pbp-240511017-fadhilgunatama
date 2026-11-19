// Mengambil data tugas dari localStorage
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// Mengambil elemen HTML
const form = document.querySelector("#form-todo");
const input = document.querySelector("#input-todo");
const list = document.querySelector("#list-todo");
const stats = document.querySelector("#stats");

// Menyimpan data ke localStorage
function simpan() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Menampilkan daftar tugas
function render() {
  list.innerHTML = "";

  if (todos.length === 0) {
    list.innerHTML = "<li>Belum ada tugas. Tambahkan tugas baru!</li>";
  }

  todos.forEach(function (todo) {
    const li = document.createElement("li");

    if (todo.selesai) {
      li.classList.add("selesai");
    }

    li.innerHTML = `
            <input
                type="checkbox"
                data-id="${todo.id}"
                ${todo.selesai ? "checked" : ""}
            >
            <span class="teks">${todo.teks}</span>
            <button class="hapus" data-id="${todo.id}">Hapus</button>
        `;

    list.appendChild(li);
  });

  const belumSelesai = todos.filter(function (todo) {
    return !todo.selesai;
  }).length;

  stats.textContent = `${belumSelesai} tugas belum selesai`;
}

// Menambahkan tugas
function tambahTodo(teks) {
  todos.push({
    id: Date.now(),
    teks: teks.trim(),
    selesai: false,
  });

  simpan();
  render();
}

// Menghapus tugas
function hapusTodo(id) {
  todos = todos.filter(function (todo) {
    return todo.id !== id;
  });

  simpan();
  render();
}

// Mengubah status tugas
function toggleSelesai(id) {
  const todo = todos.find(function (todo) {
    return todo.id === id;
  });

  if (todo) {
    todo.selesai = !todo.selesai;
  }

  simpan();
  render();
}

// Menangani form tambah tugas
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const teks = input.value.trim();

  if (teks !== "") {
    tambahTodo(teks);
    input.value = "";
  }
});

// Menangani perubahan checkbox
list.addEventListener("change", function (event) {
  if (event.target.type === "checkbox") {
    const id = Number(event.target.dataset.id);
    toggleSelesai(id);
  }
});

// Menangani tombol hapus
list.addEventListener("click", function (event) {
  if (event.target.classList.contains("hapus")) {
    const id = Number(event.target.dataset.id);
    hapusTodo(id);
  }
});

// Menampilkan data saat halaman pertama kali dibuka
render();
