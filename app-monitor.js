const tbody = document.querySelector("#reportTable tbody");

async function loadReports() {
  try {
    const snapshot = await db.collection("reports").get();
    tbody.innerHTML = "";
    snapshot.forEach(doc => {
      const r = doc.data();
      const diff = (r.planned && r.actual) 
        ? ((r.actual - r.planned) / r.planned * 100).toFixed(1) + "%" 
        : "-";
      const warnStyle = (r.planned && r.actual && Math.abs(r.actual - r.planned) / r.planned > 0.05)
        ? "style='color:red; font-weight:bold;'" : "";

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${r.projectName}</td>
        <td>${r.location}</td>
        <td>${r.activityDesc}</td>
        <td>${r.planned || "-"}</td>
        <td>${r.actual || "-"}</td>
        <td ${warnStyle}>${diff}</td>
        <td>
          <input type="checkbox" ${r.actual >= r.planned ? "checked" : ""}>
        </td>
      `;
      tbody.appendChild(tr);
    });
  } catch(err) {
    console.error("Error load:", err);
    alert("Gagal load: " + err.message);
  }
}

loadReports();