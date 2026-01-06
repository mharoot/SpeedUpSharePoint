
// Calculator Functions
function formatCurrency(amount) {
    if (amount >= 1000000) {
    return '$' + (amount / 1000000).toFixed(2) + 'M';
    }
    return '$' + amount.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
    });
}

function updateTable() {
    const associatesCount = parseFloat(document.getElementById('associatesCount').value) || 0;
    const associatesRate = parseFloat(document.getElementById('associatesRate').value) || 0;
    const partnersCount = parseFloat(document.getElementById('partnersCount').value) || 0;
    const partnersRate = parseFloat(document.getElementById('partnersRate').value) || 0;
    const paralegalsCount = parseFloat(document.getElementById('paralegalsCount').value) || 0;
    const paralegalsRate = parseFloat(document.getElementById('paralegalsRate').value) || 0;

    const tbody = document.getElementById('costTableBody');
    tbody.innerHTML = '';

    for (let hours = 1; hours <= 8; hours++) {
    const associatesCost = hours * associatesCount * associatesRate;
    const partnersCost = hours * partnersCount * partnersRate;
    const paralegalsCost = hours * paralegalsCount * paralegalsRate;
    const totalMonthlyCost = associatesCost + partnersCost + paralegalsCost;
    const annualizedCost = totalMonthlyCost * 12;

    const row = document.createElement('tr');
    row.innerHTML = `
        <td data-label="Hours Lost" class="hours-cell">${hours} hr${hours > 1 ? 's' : ''}</td>
        <td data-label="Associates" class="cost-cell">${formatCurrency(associatesCost)}</td>
        <td data-label="Partners" class="cost-cell">${formatCurrency(partnersCost)}</td>
        <td data-label="Paralegals" class="cost-cell">${formatCurrency(paralegalsCost)}</td>
        <td data-label="Total Monthly" class="total-cell">${formatCurrency(totalMonthlyCost)}</td>
        <td data-label="Annualized" class="annual-cell">${formatCurrency(annualizedCost)}</td>
    `;
    tbody.appendChild(row);
    }
}

// MAIN
function costCalculateLawMain(){
    if (document.querySelector('#cost-calculator-law') === null){
        return 0;
    }

    // Add event listeners to all inputs
    document.querySelectorAll('input[type="number"]').forEach(input => {
        input.addEventListener('input', updateTable);
    });

    // Initial table generation
    updateTable();
    console.log('law calulator enabled!')
}

costCalculateLawMain();
