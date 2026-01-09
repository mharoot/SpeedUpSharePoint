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

function updateLawTable() {
    // Get all input values
    const associatesCount = parseFloat(document.getElementById('associatesCount').value) || 0;
    const associatesRate = parseFloat(document.getElementById('associatesRate').value) || 0;
    
    const partnersCount = parseFloat(document.getElementById('partnersCount').value) || 0;
    const partnersRate = parseFloat(document.getElementById('partnersRate').value) || 0;
    
    const ofCounselCount = parseFloat(document.getElementById('ofCounselCount').value) || 0;
    const ofCounselRate = parseFloat(document.getElementById('ofCounselRate').value) || 0;
    
    const counselCount = parseFloat(document.getElementById('counselCount').value) || 0;
    const counselRate = parseFloat(document.getElementById('counselRate').value) || 0;
    
    const staffAttorneysCount = parseFloat(document.getElementById('staffAttorneysCount').value) || 0;
    const staffAttorneysRate = parseFloat(document.getElementById('staffAttorneysRate').value) || 0;
    
    const lawClerksCount = parseFloat(document.getElementById('lawClerksCount').value) || 0;
    const lawClerksRate = parseFloat(document.getElementById('lawClerksRate').value) || 0;
    
    const generalAttorneysCount = parseFloat(document.getElementById('generalAttorneysCount').value) || 0;
    const generalAttorneysRate = parseFloat(document.getElementById('generalAttorneysRate').value) || 0;
    
    const knowledgeMgmtCount = parseFloat(document.getElementById('knowledgeMgmtCount').value) || 0;
    const knowledgeMgmtRate = parseFloat(document.getElementById('knowledgeMgmtRate').value) || 0;
    
    const practiceMgmtCount = parseFloat(document.getElementById('practiceMgmtCount').value) || 0;
    const practiceMgmtRate = parseFloat(document.getElementById('practiceMgmtRate').value) || 0;

    const tbody = document.getElementById('costTableBody');
    tbody.innerHTML = '';

    for (let hours = 1; hours <= 8; hours++) {
        const associatesCost = hours * associatesCount * associatesRate;
        const partnersCost = hours * partnersCount * partnersRate;
        const ofCounselCost = hours * ofCounselCount * ofCounselRate;
        const counselCost = hours * counselCount * counselRate;
        const staffAttorneysCost = hours * staffAttorneysCount * staffAttorneysRate;
        const lawClerksCost = hours * lawClerksCount * lawClerksRate;
        const generalAttorneysCost = hours * generalAttorneysCount * generalAttorneysRate;
        const knowledgeMgmtCost = hours * knowledgeMgmtCount * knowledgeMgmtRate;
        const practiceMgmtCost = hours * practiceMgmtCount * practiceMgmtRate;
        
        const totalMonthlyCost = associatesCost + partnersCost + ofCounselCost + counselCost + 
                                 staffAttorneysCost + lawClerksCost + generalAttorneysCost + 
                                 knowledgeMgmtCost + practiceMgmtCost;
        const annualizedCost = totalMonthlyCost * 12;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td data-label="Hours Lost" class="hours-cell">${hours} hr${hours > 1 ? 's' : ''}</td>
            <td data-label="Associates" class="cost-cell">${formatCurrency(associatesCost)}</td>
            <td data-label="Partners" class="cost-cell">${formatCurrency(partnersCost)}</td>
            <td data-label="Of Counsel" class="cost-cell">${formatCurrency(ofCounselCost)}</td>
            <td data-label="Counsel" class="cost-cell">${formatCurrency(counselCost)}</td>
            <td data-label="Staff Attorneys" class="cost-cell">${formatCurrency(staffAttorneysCost)}</td>
            <td data-label="Law Clerks" class="cost-cell">${formatCurrency(lawClerksCost)}</td>
            <td data-label="General Attorneys" class="cost-cell">${formatCurrency(generalAttorneysCost)}</td>
            <td data-label="Knowledge Mgmt" class="cost-cell">${formatCurrency(knowledgeMgmtCost)}</td>
            <td data-label="Practice Mgmt" class="cost-cell">${formatCurrency(practiceMgmtCost)}</td>
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
        input.addEventListener('input', updateLawTable);
    });

    // Initial table generation
    updateLawTable();
    console.log('law calculator enabled!')
}

costCalculateLawMain();