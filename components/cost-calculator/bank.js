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
    // Get all input values
    const ibAnalystsCount = parseFloat(document.getElementById('ibAnalystsCount').value) || 0;
    const ibAnalystsRate = parseFloat(document.getElementById('ibAnalystsRate').value) || 0;
    
    const ibAssociatesCount = parseFloat(document.getElementById('ibAssociatesCount').value) || 0;
    const ibAssociatesRate = parseFloat(document.getElementById('ibAssociatesRate').value) || 0;
    
    const frAnalystsCount = parseFloat(document.getElementById('frAnalystsCount').value) || 0;
    const frAnalystsRate = parseFloat(document.getElementById('frAnalystsRate').value) || 0;
    
    const financialAnalystsCount = parseFloat(document.getElementById('financialAnalystsCount').value) || 0;
    const financialAnalystsRate = parseFloat(document.getElementById('financialAnalystsRate').value) || 0;
    
    const otherAssociatesCount = parseFloat(document.getElementById('otherAssociatesCount').value) || 0;
    const otherAssociatesRate = parseFloat(document.getElementById('otherAssociatesRate').value) || 0;
    
    const vicePresidentsCount = parseFloat(document.getElementById('vicePresidentsCount').value) || 0;
    const vicePresidentsRate = parseFloat(document.getElementById('vicePresidentsRate').value) || 0;
    
    const seniorVPsCount = parseFloat(document.getElementById('seniorVPsCount').value) || 0;
    const seniorVPsRate = parseFloat(document.getElementById('seniorVPsRate').value) || 0;
    
    const directorsCount = parseFloat(document.getElementById('directorsCount').value) || 0;
    const directorsRate = parseFloat(document.getElementById('directorsRate').value) || 0;
    
    const managingDirectorsCount = parseFloat(document.getElementById('managingDirectorsCount').value) || 0;
    const managingDirectorsRate = parseFloat(document.getElementById('managingDirectorsRate').value) || 0;
    
    const seniorMDsCount = parseFloat(document.getElementById('seniorMDsCount').value) || 0;
    const seniorMDsRate = parseFloat(document.getElementById('seniorMDsRate').value) || 0;

    const tbody = document.getElementById('costTableBody');
    tbody.innerHTML = '';

    for (let hours = 1; hours <= 8; hours++) {
        const ibAnalystsCost = hours * ibAnalystsCount * ibAnalystsRate;
        const ibAssociatesCost = hours * ibAssociatesCount * ibAssociatesRate;
        const frAnalystsCost = hours * frAnalystsCount * frAnalystsRate;
        const financialAnalystsCost = hours * financialAnalystsCount * financialAnalystsRate;
        const otherAssociatesCost = hours * otherAssociatesCount * otherAssociatesRate;
        const vicePresidentsCost = hours * vicePresidentsCount * vicePresidentsRate;
        const seniorVPsCost = hours * seniorVPsCount * seniorVPsRate;
        const directorsCost = hours * directorsCount * directorsRate;
        const managingDirectorsCost = hours * managingDirectorsCount * managingDirectorsRate;
        const seniorMDsCost = hours * seniorMDsCount * seniorMDsRate;
        
        const totalMonthlyCost = ibAnalystsCost + ibAssociatesCost + frAnalystsCost + 
                                 financialAnalystsCost + otherAssociatesCost + vicePresidentsCost + 
                                 seniorVPsCost + directorsCost + managingDirectorsCost + seniorMDsCost;
        const annualizedCost = totalMonthlyCost * 12;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td data-label="Hours Lost" class="hours-cell">${hours} hr${hours > 1 ? 's' : ''}</td>
            <td data-label="IB Analysts" class="cost-cell">${formatCurrency(ibAnalystsCost)}</td>
            <td data-label="IB Associates" class="cost-cell">${formatCurrency(ibAssociatesCost)}</td>
            <td data-label="FR Analysts" class="cost-cell">${formatCurrency(frAnalystsCost)}</td>
            <td data-label="Financial Analysts" class="cost-cell">${formatCurrency(financialAnalystsCost)}</td>
            <td data-label="Associates (Other)" class="cost-cell">${formatCurrency(otherAssociatesCost)}</td>
            <td data-label="Vice Presidents" class="cost-cell">${formatCurrency(vicePresidentsCost)}</td>
            <td data-label="Senior VPs" class="cost-cell">${formatCurrency(seniorVPsCost)}</td>
            <td data-label="Directors" class="cost-cell">${formatCurrency(directorsCost)}</td>
            <td data-label="Managing Directors" class="cost-cell">${formatCurrency(managingDirectorsCost)}</td>
            <td data-label="Senior MDs" class="cost-cell">${formatCurrency(seniorMDsCost)}</td>
            <td data-label="Total Monthly" class="total-cell">${formatCurrency(totalMonthlyCost)}</td>
            <td data-label="Annualized" class="annual-cell">${formatCurrency(annualizedCost)}</td>
        `;
        tbody.appendChild(row);
    }
}

// MAIN
function costCalculateBankMain(){
    if (document.querySelector('#cost-calculator-bank') === null){
        return 0;
    }

    // Add event listeners to all inputs
    document.querySelectorAll('input[type="number"]').forEach(input => {
        input.addEventListener('input', updateTable);
    });

    // Initial table generation
    updateTable();
    console.log('bank calculator enabled!')
}

costCalculateBankMain();