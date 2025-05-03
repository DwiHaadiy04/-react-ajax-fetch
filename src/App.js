import React, { useState } from 'react';
import './App.css';
import $ from 'jquery';

function App() {
  // State untuk form Fetch
  const [fetchNama, setFetchNama] = useState('');
  const [fetchProdi, setFetchProdi] = useState('');
  const [fetchResponse, setFetchResponse] = useState('');

  // State untuk form jQuery
  const [jqueryNama, setJqueryNama] = useState('');
  const [jqueryProdi, setJqueryProdi] = useState('');
  const [jqueryResponse, setJqueryResponse] = useState('');

  // Handler Fetch
  const handleSubmitFetch = async (e) => {
    e.preventDefault();
    const formData = { nama: fetchNama, prodi: fetchProdi };

    try {
      const res = await fetch('http://localhost:3000/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setFetchResponse(data.message);
    } catch (error) {
      setFetchResponse('Gagal mengirim data dengan Fetch.');
    }
  };

  // Handler jQuery AJAX
  const handleSubmitJquery = (e) => {
    e.preventDefault();
    const formData = { nama: jqueryNama, prodi: jqueryProdi };

    $.ajax({
      url: 'http://localhost:3000/submit',
      method: 'POST',
      data: formData,
      success: function (response) {
        setJqueryResponse(response.message);
      },
      error: function () {
        setJqueryResponse('Gagal mengirim data dengan jQuery.');
      }
    });
  };

  return (
    <div className="container">
      <h1>Form Mahasiswa D3</h1>

      <div className="form-box">
        <h2>Versi Fetch API</h2>
        <form onSubmit={handleSubmitFetch}>
          <input type="text" placeholder="Nama" value={fetchNama} onChange={(e) => setFetchNama(e.target.value)} required />
          <input type="text" placeholder="Prodi" value={fetchProdi} onChange={(e) => setFetchProdi(e.target.value)} required />
          <button type="submit">Kirim (Fetch)</button>
        </form>
        <div className="response">{fetchResponse}</div>
      </div>

      <div className="form-box">
        <h2>Versi jQuery AJAX</h2>
        <form onSubmit={handleSubmitJquery}>
          <input type="text" placeholder="Nama" value={jqueryNama} onChange={(e) => setJqueryNama(e.target.value)} required />
          <input type="text" placeholder="Prodi" value={jqueryProdi} onChange={(e) => setJqueryProdi(e.target.value)} required />
          <button type="submit">Kirim (jQuery)</button>
        </form>
        <div className="response">{jqueryResponse}</div>
      </div>
    </div>
  );
}

export default App;
