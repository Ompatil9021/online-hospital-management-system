document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('roomForm');
    const table = document.querySelector('#roomsTable tbody');
  
    function loadRooms() {
      fetch('/api/rooms')
        .then(res => res.json())
        .then(data => {
          table.innerHTML = '';
          data.forEach(room => {
            const row = document.createElement('tr');
            row.innerHTML = `
              <td>${room.RoomID}</td>
              <td>${room.RoomNumber}</td>
              <td>${room.Type}</td>
              <td>${room.Status}</td>
            `;
            table.appendChild(row);
          });
        })
        .catch(err => console.error('❌ Error loading rooms:', err));
    }
  
    form.addEventListener('submit', (e) => {
      e.preventDefault();
  
      const RoomNumber = document.getElementById('roomNumber').value;
      const Type = document.getElementById('type').value;
      const Status = document.getElementById('status').value;
  
      fetch('/api/rooms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ RoomNumber, Type, Status })
      })
        .then(res => res.text())
        .then(msg => {
          alert(msg);
          form.reset();
          loadRooms();
        })
        .catch(err => {
          console.error('❌ Error adding room:', err);
          alert('❌ Failed to add room');
        });
    });
  
    loadRooms();
  });
  