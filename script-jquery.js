$("#form").submit(function (e) {
    e.preventDefault();
    const formData = {
      nama: $("input[name='nama']").val(),
      prodi: $("input[name='prodi']").val()
    };
  
    $.ajax({
      url: "/submit",
      method: "POST",
      data: formData,
      success: function (response) {
        $("#response").text(response.message);
        console.log("Data berhasil dikirim dengan AJAX jQuery.");
      },
      error: function () {
        $("#response").text("Terjadi kesalahan.");
      }
    });
  });
  