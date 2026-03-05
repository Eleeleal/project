const form = document.getElementById("dailyReportForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const report = {
    projectName: document.getElementById("projectName").value,
    location: document.getElementById("location").value,
    activityDesc: document.getElementById("activityDesc").value,
    planned: Number(document.getElementById("planned").value),
    actual: Number(document.getElementById("actual").value),
    issues: document.getElementById("issues").value,
    followUp: document.getElementById("followUp").value,
    createdAt: new Date().toISOString(),
    progressItems: ["Pekerjaan A", "Pekerjaan B", "Pekerjaan C"], // default list progres
    progressChecked: []
  };

  try {
    await db.collection("reports").add(report);
    alert("Laporan berhasil disimpan!");
    form.reset();
  } catch(err) {
    console.error("Error simpan:", err);
    alert("Gagal simpan: " + err.message);
  }
});
