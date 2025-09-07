document.addEventListener('DOMContentLoaded', () => {
    const table = document.querySelector('#doctorsTable tbody');
    const form = document.getElementById('doctorForm');
  
    function loadDoctors() {
      fetch('/api/doctors')
        .then(res => res.json())
        .then(data => {
          table.innerHTML = '';
          data.forEach(doctor => {
            const row = document.createElement('tr');
            row.innerHTML = `
              <td>${doctor.DoctorID}</td>
              <td>${doctor.Name}</td>
              <td>${doctor.Specialization}</td>
              <td>${doctor.Contact}</td>
            `;
            table.appendChild(row);
          });
        })
        .catch(err => {
          console.error('❌ Failed to load doctors:', err);
        });
    }
  
    form.addEventListener('submit', (e) => {
      e.preventDefault();
  
      const doctor = {
        Name: document.getElementById('name').value,
        Specialization: document.getElementById('specialization').value,
        Contact: document.getElementById('contact').value
      };
  
      fetch('/api/doctors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(doctor)
      })
        .then(res => res.text())
        .then(msg => {
          alert(msg);
          form.reset();
          loadDoctors();
        })
        .catch(err => {
          console.error('❌ Failed to add doctor:', err);
          alert('Error adding doctor');
        });
    });
  
    loadDoctors(); // Initial load
  });
  