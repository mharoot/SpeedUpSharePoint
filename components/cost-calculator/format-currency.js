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