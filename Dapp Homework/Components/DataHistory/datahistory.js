document.addEventListener("DOMContentLoaded", loadRentalHistory);

function loadRentalHistory() {
  const data = JSON.parse(localStorage.getItem("rentalHistory")) || [];
  const tbody = document.querySelector("#rentalTable tbody");
  tbody.innerHTML = "";

  data.forEach(item => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>
        <img src="${item.image}" style="width: 200px; height: auto; border-radius: 8px; margin: 20px 0;">
        <div style="padding-bottom: 10px; font-size: 16px; line-height: 1.5;">
          <strong>${item.roomType}</strong><br><small>${item.roomSubtitle}</small>
        </div>
      </td>
      <td style="padding: 10px;">${item.startDate} <br>~<br> ${item.endDate}</td>
      <td>${item.price}</td>
      <td>${item.status}</td>
    `;

    tbody.appendChild(tr);
  });
}

