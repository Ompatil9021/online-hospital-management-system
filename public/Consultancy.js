document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('consultForm');
  const table = document.querySelector('#consultancyTable tbody');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const disease = document.getElementById('disease').value;

    fetch(`/api/online-consultancy?disease=${encodeURIComponent(disease)}`)
      .then(res => res.json())
      .then(data => {
        table.innerHTML = '';
        if (data.length === 0) {
          table.innerHTML = `<tr><td colspan="4">❌ No matching doctors found</td></tr>`;
        } else {
          data.forEach(doc => {
            const row = document.createElement('tr');
            row.innerHTML = `
              <td>${doc.DoctorID}</td>
              <td>${doc.FullName || doc.Name}</td>
              <td>${doc.Specialization}</td>
              <td>${doc.ContactNumber || doc.Contact}</td>
            `;
            table.appendChild(row);
          });
        }
      })
      .catch(err => console.error('Error fetching consultancy:', err));
  });
});
