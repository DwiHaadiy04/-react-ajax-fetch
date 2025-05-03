document.getElementById("form").addEventListener("submit", async function (e) {
    e.preventDefault();
  
    const form = e.target;
    const formData = {
      nama: form.nama.value,
      prodi: form.prodi.value
    };
  
    const res = await fetch("/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });
  
    const data = await res.json();
    document.getElementById("response").textContent = data.message;
  });
  