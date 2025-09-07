document.addEventListener('DOMContentLoaded', () => {
    const dischargeForm = document.querySelector('.discharge-form');
    const dischargeReason = document.getElementById('dischargeReason');
    const otherReasonInput = document.getElementById('otherReason');
    const patientIdInput = document.getElementById('patientId');

    function getQueryParam(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    const patientIdFromUrl = getQueryParam('patientId');
    if (patientIdFromUrl) {
        patientIdInput.value = patientIdFromUrl;
    }

    if (dischargeReason) {
        dischargeReason.addEventListener('change', () => {
            otherReasonInput.disabled = dischargeReason.value !== 'Other';
            otherReasonInput.required = dischargeReason.value === 'Other';
        });
    }

    if (dischargeForm) {
        dischargeForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const patientId = patientIdInput.value;
            const reason = dischargeReason.value;
            const otherReason = otherReasonInput.value;

            const dischargeDetails = {
                patientId: parseInt(patientId),
                reason: reason === 'Other' ? otherReason : reason
            };

            console.log('Sending to server:', JSON.stringify(dischargeDetails)); // Log the exact data

            try {
                const response = await fetch('/api/patients/discharge', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dischargeDetails),
                });

                console.log('Raw Response:', response); // Log the raw response object

                let result;
                try {
                    result = await response.json();
                    console.log('JSON Result:', result); // Log the parsed JSON
                } catch (jsonError) {
                    console.error('Error parsing JSON:', jsonError);
                    // If JSON parsing fails, the response might be plain text
                    const textResult = await response.text();
                    console.log('Text Result:', textResult);
                }

                if (response.ok) {
                    alert(`Patient ${patientId} discharged successfully. Reason: ${dischargeDetails.reason}`);
                    window.location.href = 'patients.html';
                } else {
                    alert(`Failed to discharge patient ${patientId}. Error: ${result?.message || 'Unknown error'}`);
                }

            } catch (error) {
                console.error('Fetch Error:', error);
                alert('An error occurred while discharging the patient.');
            }
        });
    }
});