document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('dietForm');
  const tableBody = document.querySelector('#dietTable tbody');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const disease = document.getElementById('diseaseInput').value.trim();

    if (!disease) return alert("Enter a disease");

    fetch(`/api/diet-plans?disease=${encodeURIComponent(disease)}`)
      .then(async (res) => {
        if (!res.ok) {
          const error = await res.json().catch(() => ({ error: "Server Error" }));
          throw new Error(error.error || 'Server Error');
        }
        return res.json();
      })
      .then(data => {
        tableBody.innerHTML = '';

        if (data.length === 0) {
          tableBody.innerHTML = `<tr><td colspan="2">❌ No diet plan found for "${disease}"</td></tr>`;
        } else {
          data.forEach(plan => {
            const row = document.createElement('tr');
            row.innerHTML = `
              <td>${disease}</td>
              <td>${plan.DietDescription}</td>
            `;
            tableBody.appendChild(row);
          });
        }
      })
      .catch(err => {
        console.error('Error fetching diet plan:', err);
        tableBody.innerHTML = `<tr><td colspan="2">❌ ${err.message}</td></tr>`;
      });
  });
});
