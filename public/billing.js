document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('billingForm');
  const table = document.querySelector('#billingTable tbody');

  const loadBills = () => {
    fetch('/api/billing')
      .then(res => res.json())
      .then(data => {
        table.innerHTML = '';
        data.forEach(bill => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${bill.BillID}</td>
            <td>${bill.PatientID}</td>
            <td>₹${(bill.Amount || 0).toFixed(2)}</td>

            <td>${new Date(bill.Date).toLocaleDateString()}</td>
            <td>${bill.PaymentStatus}</td>
            <td><button onclick="deleteBill(${bill.BillID})">🗑️</button></td>
          `;
          table.appendChild(row);
        });
      })
      .catch(err => console.error('Error loading bills:', err));
  };
  function loadBillingSummary() {
    fetch('/api/billing/summary')
      .then(res => res.json())
      .then(data => {
        document.getElementById('totalBills').textContent = data.totalBills;
        document.getElementById('totalAmount').textContent = data.totalAmount.toFixed(2);
        document.getElementById('highestBill').textContent = data.highestBill.toFixed(2);
        document.getElementById('lowestBill').textContent = data.lowestBill.toFixed(2);
      })
      .catch(err => console.error('❌ Error loading billing summary:', err));
  }
  
  loadBillingSummary(); // Call it after loading bills
  
  

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const PatientID = parseInt(document.getElementById('patientID').value);
    const Amount = parseFloat(document.getElementById('amount').value);
    const PaymentStatus = document.getElementById('paymentStatus').value;

    fetch('/api/billing', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ PatientID, Amount, PaymentStatus })
    })
      .then(res => res.text())
      .then(() => {
        form.reset();
        loadBills();
      })
      .catch(err => console.error('Error adding bill:', err));
  });

  window.deleteBill = function (id) {
    fetch(`/api/billing/${id}`, { method: 'DELETE' })
      .then(res => res.text())
      .then(() => loadBills())
      .catch(err => console.error('Error deleting bill:', err));
  };

  loadBills();
});
