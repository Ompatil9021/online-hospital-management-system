document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('patientForm');
  const table = document.getElementById('patientsTable');

  function loadPatients() {
    fetch('/api/patients')
      .then(res => res.json())
      .then(data => {
        table.innerHTML = '';
        if (data.length === 0) {
          table.innerHTML = '<tr><td colspan="8">No patients registered.</td></tr>';
          return;
        }

        data.forEach(p => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${p.PatientID}</td>
            <td>${p.Name}</td>
            <td>${p.Age}</td>
            <td>${p.Gender}</td>
            <td>${p.Contact}</td>
            <td>${p.RoomNo}</td>
            <td>${p.Address}</td>
            <td><button class="discharge-button" onclick="window.location.href='discharge.html?patientId=${p.PatientID}'">Discharge</button></td>
          `;
          table.appendChild(row);
        });
      })
      .catch(err => {
        console.error('❌ Error fetching patients:', err);
        table.innerHTML = '<tr><td colspan="8">❌ Failed to load patients</td></tr>';
      });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = {
      Name: document.getElementById('name').value,
      Age: parseInt(document.getElementById('age').value),
      Gender: document.getElementById('gender').value,
      Contact: document.getElementById('contact').value,
      RoomNo: parseInt(document.getElementById('roomNo').value),
      Address: document.getElementById('address').value
    };

    fetch('/api/patients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    .then(res => res.text())
    .then(msg => {
      alert(msg);
      form.reset();
      loadPatients();
    })
    .catch(err => {
      console.error('❌ Error adding patient:', err);
      alert('❌ Failed to add patient');
    });
  });

  loadPatients(); // Initial load
});
