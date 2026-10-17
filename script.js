/* =========================================================
   script.js — Logika halaman Pendaftaran Relawan
   Saat form dikirim -> jika divisi Medis tapi jurusan
                        bukan kesehatan, tolak + alert()
   ========================================================= */

// Kata kunci jurusan yang dianggap bidang kesehatan
const JURUSAN_KESEHATAN = [
  "kedokteran",
  "keperawatan",
  "farmasi",
  "kesehatan masyarakat",
  "kebidanan",
  "gizi"
];

// Ambil elemen yang dibutuhkan dari HTML
const form = document.getElementById("formRelawan");
const inputNama = document.getElementById("nama");
const selectDivisi = document.getElementById("divisi");
const inputJurusan = document.getElementById("jurusan");
const pesan = document.getElementById("pesan");

// Cek apakah jurusan mengandung salah satu kata kunci kesehatan
function isJurusanKesehatan(namaJurusan) {
  const teks = namaJurusan.toLowerCase();
  return JURUSAN_KESEHATAN.some(function (kata) {
    return teks.includes(kata);
  });
}

// Tampilkan pesan di bawah form (tipe: "gagal" atau "sukses")
function tampilkanPesan(teks, tipe) {
  pesan.textContent = teks;
  pesan.className = "pesan " + tipe;
}

// ---------- Cek divisi saat form dikirim ----------
form.addEventListener("submit", function (event) {
  event.preventDefault(); // halaman tidak di-reload

  const nama = inputNama.value.trim();
  const jurusan = inputJurusan.value.trim();
  const divisi = selectDivisi.value;

  // Tolak jika memilih Medis padahal jurusan non-kesehatan
  if (divisi === "Medis" && !isJurusanKesehatan(jurusan)) {
    selectDivisi.classList.add("error");
    tampilkanPesan("Jurusan kamu tidak terkait bidang kesehatan.", "gagal");

    // Animasi getar (kelas dari animation.css), dilepas setelah selesai
    selectDivisi.classList.add("anim-getar");
    setTimeout(function () {
      selectDivisi.classList.remove("anim-getar");
    }, 600);

    alert("Divisi Medis khusus jurusan kesehatan!");
    return;
  }

  // Lolos validasi
  selectDivisi.classList.remove("error");
  tampilkanPesan("Terima kasih, " + nama + "! Kamu terdaftar di divisi " + divisi + "!", "sukses");
  form.reset();
});

// Hapus tanda merah begitu pengguna mengganti pilihan divisi
selectDivisi.addEventListener("change", function () {
  selectDivisi.classList.remove("error");
  tampilkanPesan("", "");
});
