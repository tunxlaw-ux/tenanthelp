/**
 * UI Controls
 */
function toggleMenu() {
    document.getElementById('sidebar').classList.toggle('open');
}

/**
 * Currency Formatting
 */
function formatCurrency(input) {
    let val = input.value.replace(/,/g, '');
    if (!isNaN(val) && val !== "") {
        input.value = Number(val).toLocaleString();
    }
}

function getCleanValue(id) {
    return Number(document.getElementById(id).value.replace(/,/g, '')) || 0;
}

/**
 * Rent Calculation Logic
 */
function runCalculation() {
    const yearlyRent = getCleanValue('rent'); // Based on User Update: Rent is Yearly
    const years = Number(document.getElementById('years').value) || 1;
    
    const agentP = getCleanValue('agent');
    const legalP = getCleanValue('legal');
    const agreeP = getCleanValue('agreement');

    // Calculations
    const totalBaseRent = yearlyRent * years; // Yearly rent multiplied by duration
    const agentFee = totalBaseRent * (agentP / 100);
    const legalFee = totalBaseRent * (legalP / 100);
    const agreeFee = totalBaseRent * (agreeP / 100);
    const totalMoveIn = totalBaseRent + agentFee + legalFee + agreeFee;

    // Display
    const resultArea = document.getElementById('resultArea');
    resultArea.classList.remove('hidden');
    resultArea.innerHTML = `
        <h3 style="margin-bottom:10px; color:#2b59ff;">Cost Breakdown</h3>
        <p>Total Rent (${years} yr): <strong>₦${totalBaseRent.toLocaleString()}</strong></p>
        <p>Agent Fee (${agentP}%): <strong>₦${agentFee.toLocaleString()}</strong></p>
        <p>Legal & Agreement: <strong>₦${(legalFee + agreeFee).toLocaleString()}</strong></p>
        <hr style="margin:10px 0; border:0; border-top:1px solid #d0d7e5;">
        <p style="font-size:1.2rem;">Total Move-In: <strong>₦${totalMoveIn.toLocaleString()}</strong></p>
    `;
}
/* Add to existing js/main.js */

/**
 * Handle Calculator Selection
 */
function openCalc(type) {
    const modal = document.getElementById('calcModal');
    const body = document.getElementById('modal-body');
    modal.classList.remove('hidden');

    if (type === 'electricity') {
        body.innerHTML = `
            <h2>💡 Electricity Calculator</h2>
            <p style="margin: 15px 0;">This tool helps estimate bills based on your appliances.</p>
            <input type="number" placeholder="Enter Daily Hours" style="margin-bottom:15px;">
            <button class="btn-primary" onclick="alert('Calculating...')">Estimate Bill</button>
        `;
    } else {
        body.innerHTML = `
            <h2>Coming Soon!</h2>
            <p>The <strong>${type}</strong> calculator is currently being updated for the new yearly rent system.</p>
            <button class="btn-primary" onclick="closeCalc()" style="margin-top:20px;">Got it</button>
        `;
    }
}

function closeCalc() {
    document.getElementById('calcModal').classList.add('hidden');
}