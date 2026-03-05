const tbody = document.querySelector("#reportTable tbody");
const modal = document.getElementById("progressModal");
const closeBtn = document.querySelector(".close");
const progressList = document.getElementById("progressList");
let currentDocId = null;

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
        <td><button onclick="openModal('${doc.id}')">Detail Progres</button></td>
      `;
      tbody.appendChild(tr);
    });
  } catch(err) {
    console.error("Error load:", err);
    alert("Gagal load: " + err.message);
  }
}

function openModal(docId) {
  currentDocId = docId;
  modal.style.display = "block";
  loadProgress(docId);
}

closeBtn.onclick = () => { modal.style.display = "none"; };
window.onclick = (event) => { if (event.target == modal) modal.style.display = "none"; };

async function loadProgress(docId) {
  progressList.innerHTML = "";
  const docSnap = await db.collection("reports").doc(docId).get();
  const data = docSnap.data();
  const items = data.progressItems || ["Pekerjaan A", "Pekerjaan B", "Pekerjaan C"];
  items.forEach((item, idx) => {
    const checked = data.progressChecked && data.progressChecked.includes(item);
    progressList.innerHTML += `
      <label>
        <input type="checkbox" name="progressItem" value="${item}" ${checked ? "checked" : ""}>
        ${item}
      </label><br>
    `;
  });
}

document.getElementById("progressForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const checkedItems = Array.from(document.querySelectorAll("input[name='progressItem']:checked"))
    .map(el => el.value);
  await db.collection("reports").doc(currentDocId).update({
    progressChecked: checkedItems
  });
  alert("Progres berhasil disimpan!");
  modal.style.display = "none";
});

loadReports();
