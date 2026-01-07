function updateInsuranceTable() {
    // Get all input values
    const adjustersCount = parseFloat(document.getElementById('adjustersCount').value) || 0;
    const adjustersRate = parseFloat(document.getElementById('adjustersRate').value) || 0;
    
    const underwritersCount = parseFloat(document.getElementById('underwritersCount').value) || 0;
    const underwritersRate = parseFloat(document.getElementById('underwritersRate').value) || 0;
    
    const investigatorsCount = parseFloat(document.getElementById('investigatorsCount').value) || 0;
    const investigatorsRate = parseFloat(document.getElementById('investigatorsRate').value) || 0;
    
    const csrCount = parseFloat(document.getElementById('csrCount').value) || 0;
    const csrRate = parseFloat(document.getElementById('csrRate').value) || 0;
    
    const riskConsultantsCount = parseFloat(document.getElementById('riskConsultantsCount').value) || 0;
    const riskConsultantsRate = parseFloat(document.getElementById('riskConsultantsRate').value) || 0;
    
    const appraisersCount = parseFloat(document.getElementById('appraisersCount').value) || 0;
    const appraisersRate = parseFloat(document.getElementById('appraisersRate').value) || 0;
    
    const analystsCount = parseFloat(document.getElementById('analystsCount').value) || 0;
    const analystsRate = parseFloat(document.getElementById('analystsRate').value) || 0;

    const tbody = document.getElementById('costTableBody');
    tbody.innerHTML = '';

    for (let hours = 1; hours <= 8; hours++) {
        const adjustersCost = hours * adjustersCount * adjustersRate;
        const underwritersCost = hours * underwritersCount * underwritersRate;
        const investigatorsCost = hours * investigatorsCount * investigatorsRate;
        const csrCost = hours * csrCount * csrRate;
        const riskConsultantsCost = hours * riskConsultantsCount * riskConsultantsRate;
        const appraisersCost = hours * appraisersCount * appraisersRate;
        const analystsCost = hours * analystsCount * analystsRate;
        
        const totalMonthlyCost = adjustersCost + underwritersCost + investigatorsCost + 
                                 csrCost + riskConsultantsCost + appraisersCost + analystsCost;
        const annualizedCost = totalMonthlyCost * 12;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td data-label="Hours Lost" class="hours-cell">${hours} hr${hours > 1 ? 's' : ''}</td>
            <td data-label="Claims Adjusters" class="cost-cell">${formatCurrency(adjustersCost)}</td>
            <td data-label="Underwriters" class="cost-cell">${formatCurrency(underwritersCost)}</td>
            <td data-label="Investigators" class="cost-cell">${formatCurrency(investigatorsCost)}</td>
            <td data-label="CSRs" class="cost-cell">${formatCurrency(csrCost)}</td>
            <td data-label="Risk Consultants" class="cost-cell">${formatCurrency(riskConsultantsCost)}</td>
            <td data-label="Appraisers" class="cost-cell">${formatCurrency(appraisersCost)}</td>
            <td data-label="Analysts/Auditors" class="cost-cell">${formatCurrency(analystsCost)}</td>
            <td data-label="Total Monthly" class="total-cell">${formatCurrency(totalMonthlyCost)}</td>
            <td data-label="Annualized" class="annual-cell">${formatCurrency(annualizedCost)}</td>
        `;
        tbody.appendChild(row);
    }
}

// MAIN
function costCalculateInsuranceMain(){
    if (document.querySelector('#cost-calculator-insurance') === null){
        return 0;
    }

    // Add event listeners to all inputs
    document.querySelectorAll('input[type="number"]').forEach(input => {
        input.addEventListener('input', updateInsuranceTable);
    });

    // Initial table generation
    updateInsuranceTable();
    console.log('insurance calculator enabled!')
}

costCalculateInsuranceMain();