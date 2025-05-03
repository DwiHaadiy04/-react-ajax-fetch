const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('fe'));

// Buat koneksi ke database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',          // Sesuaikan user database MySQL kamu
  password: '',          // Kosongkan kalau default tanpa password
  database: 'pw_lanjut'
});

// Cek koneksi database
db.connect((err) => {
  if (err) {
    console.error('Gagal konek database:', err);
    return;
  }
  console.log('Berhasil konek ke database MySQL');
});

// Endpoint untuk menerima data
app.post('/submit', (req, res) => {
  const { nama, prodi } = req.body;
  if (!nama || !prodi) {
    return res.status(400).json({ message: 'Data tidak lengkap.' });
  }

  const sql = 'INSERT INTO mahasiswa (nama, prodi) VALUES (?, ?)';
  db.query(sql, [nama, prodi], (err, result) => {
    if (err) {
      console.error('Gagal insert data:', err);
      return res.status(500).json({ message: 'Gagal simpan data.' });
    }
    res.json({ message: `Halo ${nama}, prodi kamu adalah ${prodi}. Data berhasil disimpan.` });
  });
});

// Menjalankan server
app.listen(3000, () => {
  console.log('Server berjalan di http://localhost:3000');
});
