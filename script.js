let currentCalcType = 'Loan Payment Calculator';

function toggleDropdown(event, dropId) {
    event.stopPropagation();
    document.querySelectorAll('.dropdown-content').forEach(c => { 
        if(c.id !== dropId) c.classList.remove('show'); 
    });
    document.getElementById(dropId).classList.toggle('show');
}

window.onclick = function() {
    document.querySelectorAll('.dropdown-content').forEach(c => c.classList.remove('show'));
}

function switchCalculator(name) {
    currentCalcType = name;
    document.getElementById('calc-title').innerText = name;
    document.getElementById('calc-desc').innerText = "Professional financial calculation tool for " + name.toLowerCase() + ".";
    renderInputs();
    runActiveCalculator();
    window.scrollTo({ top: 150, behavior: 'smooth' });
}

function scrollToAllSections() {
    const allSections = document.getElementById('all-sections-container');
    if (allSections) {
        allSections.classList.remove('all-sections-hidden');
        allSections.scrollIntoView({ behavior: 'smooth' });
    }
}

function selectCardAndScroll(name) {
    switchCalculator(name);
    window.scrollTo({ top: 150, behavior: 'smooth' });
}

function clearCalculator() {
    document.querySelectorAll('#inputs-area input').forEach(input => input.value = '');
    runActiveCalculator();
}

function renderInputs() {
    const area = document.getElementById('inputs-area');
    if (!area) return;
    let html = '';

    if (currentCalcType === 'Savings Goal Calculator') {
        html = `
            <div class="calc-form-group"><label>Target Savings Goal</label><input type="number" id="in-val1" value="50000" oninput="runActiveCalculator()"></div>
            <div class="calc-form-group"><label>Current Savings</label><input type="number" id="in-val2" value="5000" oninput="runActiveCalculator()"></div>
            <div class="calc-form-group"><label>Monthly Contribution</label><input type="number" id="in-val3" value="1000" oninput="runActiveCalculator()"></div>
            <div class="calc-form-group"><label>Annual Interest Rate (%)</label><input type="number" id="in-val4" step="0.1" value="4.0" oninput="runActiveCalculator()"></div>
        `;
    } else if (currentCalcType === 'Retirement Calculator') {
        html = `
            <div class="calc-form-group"><label>Current Age</label><input type="number" id="in-val1" value="30" oninput="runActiveCalculator()"></div>
            <div class="calc-form-group"><label>Retirement Age</label><input type="number" id="in-val2" value="65" oninput="runActiveCalculator()"></div>
            <div class="calc-form-group"><label>Current Retirement Savings</label><input type="number" id="in-val3" value="20000" oninput="runActiveCalculator()"></div>
            <div class="calc-form-group"><label>Monthly Contribution</label><input type="number" id="in-val4" value="500" oninput="runActiveCalculator()"></div>
            <div class="calc-form-group"><label>Expected Annual Return (%)</label><input type="number" id="in-val5" step="0.1" value="7.0" oninput="runActiveCalculator()"></div>
        `;
    } else if (currentCalcType === 'Inflation Calculator') {
        html = `
            <div class="calc-form-group"><label>Initial Amount / Cost</label><input type="number" id="in-val1" value="10000" oninput="runActiveCalculator()"></div>
            <div class="calc-form-group"><label>Annual Inflation Rate (%)</label><input type="number" id="in-val2" step="0.1" value="3.5" oninput="runActiveCalculator()"></div>
            <div class="calc-form-group"><label>Time Horizon (Years)</label><input type="number" id="in-val3" value="10" oninput="runActiveCalculator()"></div>
        `;
    } else if (currentCalcType === 'Overhead Rate Calculator') {
        html = `
            <div class="calc-form-group"><label>Total Overhead Costs</label><input type="number" id="in-val1" value="15000" oninput="runActiveCalculator()"></div>
            <div class="calc-form-group"><label>Direct Labor Costs</label><input type="number" id="in-val2" value="30000" oninput="runActiveCalculator()"></div>
        `;
    } else if (currentCalcType === 'ROI Calculator' || currentCalcType === 'Business ROI Calculator') {
        html = `
            <div class="calc-form-group"><label>Initial Investment / Cost</label><input type="number" id="in-val1" value="30000" oninput="runActiveCalculator()"></div>
            <div class="calc-form-group"><label>Total Return / Final Value</label><input type="number" id="in-val2" value="50000" oninput="runActiveCalculator()"></div>
        `;
    } else if (currentCalcType === 'Fixed Deposit Calculator') {
        html = `
            <div class="calc-form-group"><label>Deposit Amount</label><input type="number" id="in-val1" value="10000" oninput="runActiveCalculator()"></div>
            <div class="calc-form-group"><label>Annual Interest Rate (%)</label><input type="number" id="in-val2" step="0.1" value="6.0" oninput="runActiveCalculator()"></div>
            <div class="calc-form-group"><label>Time Period (Years)</label><input type="number" id="in-val3" value="5" oninput="runActiveCalculator()"></div>
        `;
    } else if (currentCalcType === 'Dividend Calculator') {
        html = `
            <div class="calc-form-group"><label>Number of Shares</label><input type="number" id="in-val1" value="100" oninput="runActiveCalculator()"></div>
            <div class="calc-form-group"><label>Annual Dividend Per Share</label><input type="number" id="in-val2" step="0.01" value="2.50" oninput="runActiveCalculator()"></div>
            <div class="calc-form-group"><label>Share Price</label><input type="number" id="in-val3" step="0.01" value="50.00" oninput="runActiveCalculator()"></div>
        `;
    } else if (currentCalcType === 'Dollar-Cost Averaging Calculator') {
        html = `
            <div class="calc-form-group"><label>Periodic Investment Amount</label><input type="number" id="in-val1" value="500" oninput="runActiveCalculator()"></div>
            <div class="calc-form-group"><label>Expected Annual Return (%)</label><input type="number" id="in-val2" step="0.1" value="8.0" oninput="runActiveCalculator()"></div>
            <div class="calc-form-group"><label>Investment Period (Years)</label><input type="number" id="in-val3" value="10" oninput="runActiveCalculator()"></div>
        `;
    } else if (currentCalcType === 'Sales Tax Calculator') {
        html = `
            <div class="calc-form-group"><label>Subtotal / Item Price</label><input type="number" id="in-val1" value="100" oninput="runActiveCalculator()"></div>
            <div class="calc-form-group"><label>Sales Tax Rate (%)</label><input type="number" id="in-val2" step="0.1" value="8.5" oninput="runActiveCalculator()"></div>
        `;
    } else if (currentCalcType === 'Capital Gains Tax Calculator') {
        html = `
            <div class="calc-form-group"><label>Purchase Price (Cost Basis)</label><input type="number" id="in-val1" value="10000" oninput="runActiveCalculator()"></div>
            <div class="calc-form-group"><label>Sale Price</label><input type="number" id="in-val2" value="15000" oninput="runActiveCalculator()"></div>
            <div class="calc-form-group"><label>Capital Gains Tax Rate (%)</label><input type="number" id="in-val3" step="0.1" value="15.0" oninput="runActiveCalculator()"></div>
        `;
    } else if (currentCalcType === 'Bonus Tax Calculator') {
        html = `
            <div class="calc-form-group"><label>Bonus Amount</label><input type="number" id="in-val1" value="5000" oninput="runActiveCalculator()"></div>
            <div class="calc-form-group"><label>Bonus Tax Rate (%)</label><input type="number" id="in-val2" step="0.1" value="22.0" oninput="runActiveCalculator()"></div>
        `;
    } else if (currentCalcType === 'Estate Tax Calculator') {
        html = `
            <div class="calc-form-group"><label>Total Estate Value</label><input type="number" id="in-val1" value="1500000" oninput="runActiveCalculator()"></div>
            <div class="calc-form-group"><label>Exemption / Deductions</label><input type="number" id="in-val2" value="500000" oninput="runActiveCalculator()"></div>
            <div class="calc-form-group"><label>Estate Tax Rate (%)</label><input type="number" id="in-val3" step="0.1" value="40.0" oninput="runActiveCalculator()"></div>
        `;
    } else if (currentCalcType === 'Rental Yield Calculator') {
        html = `
            <div class="calc-form-group"><label>Annual Rental Income</label><input type="number" id="in-val1" value="24000" oninput="runActiveCalculator()"></div>
            <div class="calc-form-group"><label>Property Value / Purchase Price</label><input type="number" id="in-val2" value="300000" oninput="runActiveCalculator()"></div>
        `;
    } else if (currentCalcType === 'Closing Costs Calculator') {
        html = `
            <div class="calc-form-group"><label>Home / Purchase Price</label><input type="number" id="in-val1" value="300000" oninput="runActiveCalculator()"></div>
            <div class="calc-form-group"><label>Estimated Closing Cost Rate (%)</label><input type="number" id="in-val2" step="0.1" value="3.0" oninput="runActiveCalculator()"></div>
        `;
    } else if (currentCalcType === 'Rent vs Buy Calculator') {
        html = `
            <div class="calc-form-group"><label>Monthly Rent</label><input type="number" id="in-val1" value="1800" oninput="runActiveCalculator()"></div>
            <div class="calc-form-group"><label>Home Purchase Price</label><input type="number" id="in-val2" value="300000" oninput="runActiveCalculator()"></div>
            <div class="calc-form-group"><label>Years to Stay / Horizon</label><input type="number" id="in-val3" value="7" oninput="runActiveCalculator()"></div>
        `;
    } else if (currentCalcType === 'Property Valuation Calculator') {
        html = `
            <div class="calc-form-group"><label>Net Operating Income (NOI)</label><input type="number" id="in-val1" value="25000" oninput="runActiveCalculator()"></div>
            <div class="calc-form-group"><label>Capitalization Rate (%)</label><input type="number" id="in-val2" step="0.1" value="6.5" oninput="runActiveCalculator()"></div>
        `;
    } else if (currentCalcType === 'Home Renovation ROI Calculator') {
        html = `
            <div class="calc-form-group"><label>Renovation Cost</label><input type="number" id="in-val1" value="15000" oninput="runActiveCalculator()"></div>
            <div class="calc-form-group"><label>Added Home Value (Resale Value Increase)</label><input type="number" id="in-val2" value="18000" oninput="runActiveCalculator()"></div>
        `;
    } else if (currentCalcType === 'Property Transfer Tax Calculator') {
        html = `
            <div class="calc-form-group"><label>Property Value / Purchase Price</label><input type="number" id="in-val1" value="300000" oninput="runActiveCalculator()"></div>
            <div class="calc-form-group"><label>Transfer Tax Rate (%)</label><input type="number" id="in-val2" step="0.1" value="1.5" oninput="runActiveCalculator()"></div>
        `;
    } else if (currentCalcType === 'Break-Even Point Calculator') {
        html = `
            <div class="calc-form-group"><label>Fixed Costs</label><input type="number" id="in-val1" value="10000" oninput="runActiveCalculator()"></div>
            <div class="calc-form-group"><label>Variable Cost Per Unit</label><input type="number" id="in-val2" value="20" oninput="runActiveCalculator()"></div>
            <div class="calc-form-group"><label>Price Per Unit</label><input type="number" id="in-val3" value="50" oninput="runActiveCalculator()"></div>
        `;
    } else if (currentCalcType === 'Cash Flow Calculator') {
        html = `
            <div class="calc-form-group"><label>Total Cash Inflows</label><input type="number" id="in-val1" value="50000" oninput="runActiveCalculator()"></div>
            <div class="calc-form-group"><label>Total Cash Outflows</label><input type="number" id="in-val2" value="35000" oninput="runActiveCalculator()"></div>
        `;
    } else if (currentCalcType === 'Markup Calculator') {
        html = `
            <div class="calc-form-group"><label>Cost Price</label><input type="number" id="in-val1" value="100" oninput="runActiveCalculator()"></div>
            <div class="calc-form-group"><label>Markup Percentage (%)</label><input type="number" id="in-val2" step="0.1" value="25" oninput="runActiveCalculator()"></div>
        `;
    } else if (currentCalcType === 'Discount Calculator') {
        html = `
            <div class="calc-form-group"><label>Original Price</label><input type="number" id="in-val1" value="100" oninput="runActiveCalculator()"></div>
            <div class="calc-form-group"><label>Discount Percentage (%)</label><input type="number" id="in-val2" step="0.1" value="20" oninput="runActiveCalculator()"></div>
        `;
    } else if (currentCalcType === 'Working Capital Calculator') {
        html = `
            <div class="calc-form-group"><label>Current Assets</label><input type="number" id="in-val1" value="50000" oninput="runActiveCalculator()"></div>
            <div class="calc-form-group"><label>Current Liabilities</label><input type="number" id="in-val2" value="30000" oninput="runActiveCalculator()"></div>
        `;
    } else if (currentCalcType === 'Compound Interest Calculator' || currentCalcType === 'Investment Calculator' || currentCalcType === 'Savings Calculator') {
        html = `
            <div class="calc-form-group"><label>Initial Principal / Investment</label><input type="number" id="in-val1" value="10000" oninput="runActiveCalculator()"></div>
            <div class="calc-form-group"><label>Annual Interest Rate (%)</label><input type="number" id="in-val2" step="0.1" value="7.0" oninput="runActiveCalculator()"></div>
            <div class="calc-form-group"><label>Time Horizon (Years)</label><input type="number" id="in-val3" value="10" oninput="runActiveCalculator()"></div>
        `;
    } else if (currentCalcType === 'Down Payment Calculator') {
        html = `
            <div class="calc-form-group"><label>Home / Property Value</label><input type="number" id="in-val1" value="300000" oninput="runActiveCalculator()"></div>
            <div class="calc-form-group"><label>Down Payment Percentage (%)</label><input type="number" id="in-val2" step="0.1" value="20" oninput="runActiveCalculator()"></div>
        `;
    } else if (currentCalcType === 'Student Loan Calculator') {
        html = `
            <div class="calc-form-group"><label>Loan Amount / Principal</label><input type="number" id="in-val1" value="30000" oninput="runActiveCalculator()"></div>
            <div class="calc-form-group"><label>Interest Rate / APR (%)</label><input type="number" id="in-val2" step="0.1" value="5.5" oninput="runActiveCalculator()"></div>
            <div class="calc-form-group"><label>Repayment Term (Years)</label><input type="number" id="in-val3" value="10" oninput="runActiveCalculator()"></div>
            <div class="calc-form-group"><label>Grace Period (Months Post-Graduation)</label><input type="number" id="in-val4" value="6" oninput="runActiveCalculator()"></div>
        `;
    } else if (currentCalcType === 'Loan Comparison') {
        html = `
            <h4 style="color: var(--text-main); margin-bottom: 10px; font-size: 14px;">Loan Option A</h4>
            <div class="calc-form-group"><label>Principal / Amount A</label><input type="number" id="in-val1" value="25000" oninput="runActiveCalculator()"></div>
            <div class="calc-form-group"><label>Interest Rate A (%)</label><input type="number" id="in-val2" step="0.1" value="6.5" oninput="runActiveCalculator()"></div>
            <div class="calc-form-group"><label>Term A (Years)</label><input type="number" id="in-val3" value="5" oninput="runActiveCalculator()"></div>
            
            <hr style="border: 0; border-top: 1px solid rgba(255,255,255,0.1); margin: 15px 0;">
            
            <h4 style="color: var(--text-main); margin-bottom: 10px; font-size: 14px;">Loan Option B</h4>
            <div class="calc-form-group"><label>Interest Rate B (%)</label><input type="number" id="in-val4" step="0.1" value="7.5" oninput="runActiveCalculator()"></div>
            <div class="calc-form-group"><label>Term B (Years)</label><input type="number" id="in-val5" value="4" oninput="runActiveCalculator()"></div>
        `;
    } else if (currentCalcType.includes('Loan') || currentCalcType.includes('Mortgage') || currentCalcType.includes('Debt') || currentCalcType.includes('Credit Card')) {
        html = `
            <div class="calc-form-group"><label>Principal / Amount</label><input type="number" id="in-val1" value="25000" oninput="runActiveCalculator()"></div>
            <div class="calc-form-group"><label>Interest Rate / APR (%)</label><input type="number" id="in-val2" step="0.1" value="6.5" oninput="runActiveCalculator()"></div>
            <div class="calc-form-group"><label>Term (Years)</label><input type="number" id="in-val3" value="5" oninput="runActiveCalculator()"></div>
        `;
    } else if (currentCalcType.includes('Tax') || currentCalcType.includes('Pay') || currentCalcType.includes('Salary') || currentCalcType.includes('Deductions')) {
        html = `
            <div class="calc-form-group"><label>Gross Income / Wage</label><input type="number" id="in-val1" value="60000" oninput="runActiveCalculator()"></div>
            <div class="calc-form-group"><label>Tax / Deduction Rate (%)</label><input type="number" id="in-val2" step="0.1" value="15" oninput="runActiveCalculator()"></div>
        `;
    } else {
        html = `
            <div class="calc-form-group"><label>Initial Investment / Cost</label><input type="number" id="in-val1" value="30000" oninput="runActiveCalculator()"></div>
            <div class="calc-form-group"><label>Total Return / Final Value</label><input type="number" id="in-val2" value="50000" oninput="runActiveCalculator()"></div>
        `;
    }
    area.innerHTML = html;
}

function runActiveCalculator() {
    const currencySelect = document.getElementById('currency-select');
    const cur = currencySelect ? currencySelect.value : '$';
    const resArea = document.getElementById('results-content');
    if (!resArea) return;
    
    let input1 = document.getElementById('in-val1');
    let input2 = document.getElementById('in-val2');
    let input3 = document.getElementById('in-val3');
    let input4 = document.getElementById('in-val4');
    let input5 = document.getElementById('in-val5');

    if ((input1 && input1.value === '') || (input2 && input2.value === '')) {
        resArea.innerHTML = `
            <div class="result-item"><span>Result:</span><strong>${cur} 0.00</strong></div>
        `;
        return;
    }

    let v1 = parseFloat(input1?.value) || 0;
    let v2 = parseFloat(input2?.value) || 0;
    let v3 = parseFloat(input3?.value) || 0;
    let v4 = parseFloat(input4?.value) || 0;
    let v5 = parseFloat(input5?.value) || 0;

    let r1 = 0, r2 = 0, r3 = 0;

    if (currentCalcType === 'Savings Goal Calculator') {
        let target = v1;
        let current = v2;
        let monthly = v3;
        let annualRate = v4 / 100;
        let monthlyRate = annualRate / 12;

        let months = 0;
        if (current >= target) {
            months = 0;
        } else if (monthlyRate === 0) {
            months = monthly <= 0 ? Infinity : Math.ceil((target - current) / monthly);
        } else {
            let m = 0;
            let currentVal = current;
            while (currentVal < target && m < 1200) {
                currentVal = (currentVal * (1 + monthlyRate)) + monthly;
                m++;
            }
            months = m;
        }

        let yearsNeeded = (months / 12).toFixed(1);

        resArea.innerHTML = `
            <div class="result-item"><span>Time to Goal:</span><strong>${months} Months (${yearsNeeded} Yrs)</strong></div>
            <div class="result-item"><span>Total Contributions:</span><strong>${cur} ${(current + (monthly * months)).toFixed(2)}</strong></div>
        `;
    } else if (currentCalcType === 'Retirement Calculator') {
        let years = Math.max(0, v2 - v1);
        let months = years * 12;
        let monthlyRate = (v5 / 100) / 12;
        
        let fvPrincipal = v3 * Math.pow(1 + (v5 / 100), years);
        let fvContributions = monthlyRate === 0 ? v4 * months : v4 * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
        
        let totalNestEgg = fvPrincipal + fvContributions;
        let totalContributions = v3 + (v4 * months);
        let totalInterest = totalNestEgg - totalContributions;

        resArea.innerHTML = `
            <div class="result-item"><span>Retirement Nest Egg:</span><strong>${cur} ${totalNestEgg.toFixed(2)}</strong></div>
            <div class="result-item"><span>Total Contributions:</span><strong>${cur} ${totalContributions.toFixed(2)}</strong></div>
            <div class="result-item"><span>Interest Earned:</span><strong>${cur} ${totalInterest.toFixed(2)}</strong></div>
        `;
    } else if (currentCalcType === 'Inflation Calculator') {
        let futureValue = v1 * Math.pow(1 + (v2 / 100), v3);
        let difference = futureValue - v1;

        resArea.innerHTML = `
            <div class="result-item"><span>Future Value (Cost):</span><strong>${cur} ${futureValue.toFixed(2)}</strong></div>
            <div class="result-item"><span>Purchasing Power Loss:</span><strong>${cur} ${difference.toFixed(2)}</strong></div>
        `;
    } else if (currentCalcType === 'Overhead Rate Calculator') {
        let overheadCosts = v1;
        let directLabor = v2;
        let overheadRate = directLabor > 0 ? (overheadCosts / directLabor) * 100 : 0;

        resArea.innerHTML = `
            <div class="result-item"><span>Overhead Rate:</span><strong>${overheadRate.toFixed(2)}%</strong></div>
            <div class="result-item"><span>Cost Ratio:</span><strong>${cur} ${overheadCosts.toFixed(2)} / ${cur} ${directLabor.toFixed(2)}</strong></div>
        `;
    } else if (currentCalcType === 'ROI Calculator' || currentCalcType === 'Business ROI Calculator') {
        let cost = v1;
        let finalValue = v2;
        let netProfit = finalValue - cost;
        let roiPercentage = cost > 0 ? (netProfit / cost) * 100 : 0;

        resArea.innerHTML = `
            <div class="result-item"><span>Net Profit:</span><strong>${cur} ${netProfit.toFixed(2)}</strong></div>
            <div class="result-item"><span>ROI Percentage:</span><strong>${roiPercentage.toFixed(2)}%</strong></div>
        `;
    } else if (currentCalcType === 'Fixed Deposit Calculator') {
        let maturityAmount = v1 * Math.pow(1 + (v2 / 100), v3);
        let interestEarned = maturityAmount - v1;

        resArea.innerHTML = `
            <div class="result-item"><span>Maturity Amount:</span><strong>${cur} ${maturityAmount.toFixed(2)}</strong></div>
            <div class="result-item"><span>Interest Earned:</span><strong>${cur} ${interestEarned.toFixed(2)}</strong></div>
        `;
    } else if (currentCalcType === 'Dividend Calculator') {
        let totalAnnualDividend = v1 * v2;
        let totalInvestmentValue = v1 * v3;
        let dividendYield = totalInvestmentValue > 0 ? (totalAnnualDividend / totalInvestmentValue) * 100 : 0;

        resArea.innerHTML = `
            <div class="result-item"><span>Annual Dividend:</span><strong>${cur} ${totalAnnualDividend.toFixed(2)}</strong></div>
            <div class="result-item"><span>Dividend Yield:</span><strong>${dividendYield.toFixed(2)}%</strong></div>
        `;
    } else if (currentCalcType === 'Dollar-Cost Averaging Calculator') {
        let monthlyAmount = v1;
        let annualRate = v2 / 100;
        let monthlyRate = annualRate / 12;
        let months = v3 * 12;

        let totalInvested = monthlyAmount * months;
        let futureValue = monthlyRate === 0 ? totalInvested : monthlyAmount * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
        let totalEarnings = futureValue - totalInvested;

        resArea.innerHTML = `
            <div class="result-item"><span>Total Invested:</span><strong>${cur} ${totalInvested.toFixed(2)}</strong></div>
            <div class="result-item"><span>Portfolio Value:</span><strong>${cur} ${futureValue.toFixed(2)}</strong></div>
            <div class="result-item"><span>Total Earnings:</span><strong>${cur} ${totalEarnings.toFixed(2)}</strong></div>
        `;
    } else if (currentCalcType === 'Sales Tax Calculator') {
        r2 = v1 * (v2 / 100);
        r1 = v1 + r2;

        resArea.innerHTML = `
            <div class="result-item"><span>Sales Tax Amount:</span><strong>${cur} ${r2.toFixed(2)}</strong></div>
            <div class="result-item"><span>Total Price (Inc. Tax):</span><strong>${cur} ${r1.toFixed(2)}</strong></div>
        `;
    } else if (currentCalcType === 'Capital Gains Tax Calculator') {
        let capitalGain = Math.max(0, v2 - v1);
        let taxAmount = capitalGain * (v3 / 100);
        let netProfit = capitalGain - taxAmount;

        resArea.innerHTML = `
            <div class="result-item"><span>Capital Gain:</span><strong>${cur} ${capitalGain.toFixed(2)}</strong></div>
            <div class="result-item"><span>Tax Owed:</span><strong>${cur} ${taxAmount.toFixed(2)}</strong></div>
            <div class="result-item"><span>Net Profit (Aft. Tax):</span><strong>${cur} ${netProfit.toFixed(2)}</strong></div>
        `;
    } else if (currentCalcType === 'Bonus Tax Calculator') {
        let taxAmount = v1 * (v2 / 100);
        let netBonus = v1 - taxAmount;

        resArea.innerHTML = `
            <div class="result-item"><span>Bonus Tax Owed:</span><strong>${cur} ${taxAmount.toFixed(2)}</strong></div>
            <div class="result-item"><span>Net Bonus (Aft. Tax):</span><strong>${cur} ${netBonus.toFixed(2)}</strong></div>
        `;
    } else if (currentCalcType === 'Estate Tax Calculator') {
        let taxableEstate = Math.max(0, v1 - v2);
        let taxOwed = taxableEstate * (v3 / 100);
        let netEstate = v1 - taxOwed;

        resArea.innerHTML = `
            <div class="result-item"><span>Taxable Estate:</span><strong>${cur} ${taxableEstate.toFixed(2)}</strong></div>
            <div class="result-item"><span>Estate Tax Owed:</span><strong>${cur} ${taxOwed.toFixed(2)}</strong></div>
            <div class="result-item"><span>Net Estate (Aft. Tax):</span><strong>${cur} ${netEstate.toFixed(2)}</strong></div>
        `;
    } else if (currentCalcType === 'Rental Yield Calculator') {
        let rentalYield = v2 > 0 ? (v1 / v2) * 100 : 0;
        let monthlyRent = v1 / 12;

        resArea.innerHTML = `
            <div class="result-item"><span>Rental Yield:</span><strong>${rentalYield.toFixed(2)}%</strong></div>
            <div class="result-item"><span>Monthly Rent:</span><strong>${cur} ${monthlyRent.toFixed(2)}</strong></div>
        `;
    } else if (currentCalcType === 'Closing Costs Calculator') {
        let closingCosts = v1 * (v2 / 100);
        let totalCost = v1 + closingCosts;

        resArea.innerHTML = `
            <div class="result-item"><span>Estimated Closing Costs:</span><strong>${cur} ${closingCosts.toFixed(2)}</strong></div>
            <div class="result-item"><span>Total Purchase Cost:</span><strong>${cur} ${totalCost.toFixed(2)}</strong></div>
        `;
    } else if (currentCalcType === 'Rent vs Buy Calculator') {
        let totalRentPaid = v1 * 12 * v3;
        let estimatedBuyingCost = v2 * 0.05 * v3;

        resArea.innerHTML = `
            <div class="result-item"><span>Total Rent Paid (${v3} Yrs):</span><strong>${cur} ${totalRentPaid.toFixed(2)}</strong></div>
            <div class="result-item"><span>Estimated Buy Expenses:</span><strong>${cur} ${estimatedBuyingCost.toFixed(2)}</strong></div>
        `;
    } else if (currentCalcType === 'Property Valuation Calculator') {
        let capRate = v2 / 100;
        let propertyValue = capRate > 0 ? v1 / capRate : 0;

        resArea.innerHTML = `
            <div class="result-item"><span>Estimated Property Value:</span><strong>${cur} ${propertyValue.toFixed(2)}</strong></div>
            <div class="result-item"><span>Cap Rate Used:</span><strong>${v2.toFixed(2)}%</strong></div>
        `;
    } else if (currentCalcType === 'Home Renovation ROI Calculator') {
        let netProfit = v2 - v1;
        let roiPercentage = v1 > 0 ? (netProfit / v1) * 100 : 0;

        resArea.innerHTML = `
            <div class="result-item"><span>Net Value Added:</span><strong>${cur} ${netProfit.toFixed(2)}</strong></div>
            <div class="result-item"><span>Renovation ROI:</span><strong>${roiPercentage.toFixed(2)}%</strong></div>
        `;
    } else if (currentCalcType === 'Property Transfer Tax Calculator') {
        let taxAmount = v1 * (v2 / 100);
        let totalCost = v1 + taxAmount;

        resArea.innerHTML = `
            <div class="result-item"><span>Transfer Tax Owed:</span><strong>${cur} ${taxAmount.toFixed(2)}</strong></div>
            <div class="result-item"><span>Total Cost (Inc. Tax):</span><strong>${cur} ${totalCost.toFixed(2)}</strong></div>
        `;
    } else if (currentCalcType === 'Break-Even Point Calculator') {
        let fixedCosts = v1;
        let varCost = v2;
        let pricePerUnit = v3;
        
        let contributionMargin = pricePerUnit - varCost;
        let breakEvenUnits = contributionMargin > 0 ? fixedCosts / contributionMargin : 0;
        let breakEvenRevenue = breakEvenUnits * pricePerUnit;

        resArea.innerHTML = `
            <div class="result-item"><span>Break-Even Units:</span><strong>${Math.ceil(breakEvenUnits).toLocaleString()} Units</strong></div>
            <div class="result-item"><span>Break-Even Revenue:</span><strong>${cur} ${breakEvenRevenue.toFixed(2)}</strong></div>
        `;
    } else if (currentCalcType === 'Cash Flow Calculator') {
        let inflows = v1;
        let outflows = v2;
        let netCashFlow = inflows - outflows;

        resArea.innerHTML = `
            <div class="result-item"><span>Net Cash Flow:</span><strong>${cur} ${netCashFlow.toFixed(2)}</strong></div>
            <div class="result-item"><span>Cash Status:</span><strong>${netCashFlow >= 0 ? 'Positive Cash Flow' : 'Negative Cash Flow'}</strong></div>
        `;
    } else if (currentCalcType === 'Markup Calculator') {
        let costPrice = v1;
        let markupPct = v2 / 100;
        let markupAmount = costPrice * markupPct;
        let sellingPrice = costPrice + markupAmount;

        resArea.innerHTML = `
            <div class="result-item"><span>Markup Amount:</span><strong>${cur} ${markupAmount.toFixed(2)}</strong></div>
            <div class="result-item"><span>Selling Price:</span><strong>${cur} ${sellingPrice.toFixed(2)}</strong></div>
        `;
    } else if (currentCalcType === 'Discount Calculator') {
        let originalPrice = v1;
        let discountPct = v2 / 100;
        let discountAmount = originalPrice * discountPct;
        let finalPrice = originalPrice - discountAmount;

        resArea.innerHTML = `
            <div class="result-item"><span>Discount Amount:</span><strong>${cur} ${discountAmount.toFixed(2)}</strong></div>
            <div class="result-item"><span>Final Price:</span><strong>${cur} ${finalPrice.toFixed(2)}</strong></div>
        `;
    } else if (currentCalcType === 'Working Capital Calculator') {
        let currentAssets = v1;
        let currentLiabilities = v2;
        let workingCapital = currentAssets - currentLiabilities;
        let currentRatio = currentLiabilities > 0 ? (currentAssets / currentLiabilities) : 0;

        resArea.innerHTML = `
            <div class="result-item"><span>Working Capital:</span><strong>${cur} ${workingCapital.toFixed(2)}</strong></div>
            <div class="result-item"><span>Current Ratio:</span><strong>${currentRatio.toFixed(2)}</strong></div>
        `;
    } else if (currentCalcType === 'Compound Interest Calculator' || currentCalcType === 'Investment Calculator' || currentCalcType === 'Savings Calculator') {
        let totalCompound = v1 * Math.pow(1 + (v2 / 100), v3);
        let interestEarned = totalCompound - v1;

        resArea.innerHTML = `
            <div class="result-item"><span>Total Compound:</span><strong>${cur} ${totalCompound.toFixed(2)}</strong></div>
            <div class="result-item"><span>Interest Earned:</span><strong>${cur} ${interestEarned.toFixed(2)}</strong></div>
        `;
    } else if (currentCalcType === 'Down Payment Calculator') {
        r1 = v1 * (v2 / 100);
        r2 = v1 - r1;

        resArea.innerHTML = `
            <div class="result-item"><span>Down Payment:</span><strong>${cur} ${r1.toFixed(2)}</strong></div>
            <div class="result-item"><span>Loan Amount:</span><strong>${cur} ${r2.toFixed(2)}</strong></div>
        `;
    } else if (currentCalcType === 'Student Loan Calculator') {
        let monthlyRate = (v2 / 100) / 12;
        let graceInterest = v1 * monthlyRate * v4;
        let adjustedPrincipal = v1 + graceInterest;
        let n = v3 * 12;

        r1 = monthlyRate === 0 ? adjustedPrincipal / n : (adjustedPrincipal * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
        r3 = (r1 * n) + graceInterest;
        r2 = r3 - v1;

        resArea.innerHTML = `
            <div class="result-item"><span>Monthly Payment:</span><strong>${cur} ${r1.toFixed(2)}</strong></div>
            <div class="result-item"><span>Grace Accrued Int:</span><strong>${cur} ${graceInterest.toFixed(2)}</strong></div>
            <div class="result-item"><span>Total Interest:</span><strong>${cur} ${r2.toFixed(2)}</strong></div>
            <div class="result-item"><span>Total Payment:</span><strong>${cur} ${r3.toFixed(2)}</strong></div>
        `;
    } else if (currentCalcType === 'Loan Comparison') {
        let rateA = (v2 / 100) / 12;
        let nA = v3 * 12;
        let paymentA = rateA === 0 ? v1 / nA : (v1 * rateA * Math.pow(1 + rateA, nA)) / (Math.pow(1 + rateA, nA) - 1);
        let totalA = paymentA * nA;

        let rateB = (v4 / 100) / 12;
        let nB = v5 * 12;
        let paymentB = rateB === 0 ? v1 / nB : (v1 * rateB * Math.pow(1 + rateB, nB)) / (Math.pow(1 + rateB, nB) - 1);
        let totalB = paymentB * nB;

        resArea.innerHTML = `
            <div class="result-item"><span>Option A Monthly:</span><strong>${cur} ${paymentA.toFixed(2)}</strong></div>
            <div class="result-item"><span>Option A Total:</span><strong>${cur} ${totalA.toFixed(2)}</strong></div>
            <hr style="border:0; border-top:1px solid rgba(255,255,255,0.1); margin:8px 0;">
            <div class="result-item"><span>Option B Monthly:</span><strong>${cur} ${paymentB.toFixed(2)}</strong></div>
            <div class="result-item"><span>Option B Total:</span><strong>${cur} ${totalB.toFixed(2)}</strong></div>
        `;
    } else if (currentCalcType.includes('Loan') || currentCalcType.includes('Mortgage') || currentCalcType.includes('Debt') || currentCalcType.includes('Credit Card')) {
        let rate = (v2 / 100) / 12;
        let n = v3 * 12;
        r1 = rate === 0 ? v1 / n : (v1 * rate * Math.pow(1 + rate, n)) / (Math.pow(1 + rate, n) - 1);
        r2 = (r1 * n) - v1;
        r3 = r1 * n;
        if(isNaN(r1) || !isFinite(r1)) r1 = 0;

        resArea.innerHTML = `
            <div class="result-item"><span>Monthly Payment:</span><strong>${cur} ${r1.toFixed(2)}</strong></div>
            <div class="result-item"><span>Total Interest:</span><strong>${cur} ${r2.toFixed(2)}</strong></div>
            <div class="result-item"><span>Total Payment:</span><strong>${cur} ${r3.toFixed(2)}</strong></div>
        `;
    } else if (currentCalcType.includes('Tax') || currentCalcType.includes('Pay') || currentCalcType.includes('Salary')) {
        r2 = v1 * (v2 / 100);
        r1 = v1 - r2;

        resArea.innerHTML = `
            <div class="result-item"><span>Net Amount:</span><strong>${cur} ${r1.toFixed(2)}</strong></div>
            <div class="result-item"><span>Deduction / Tax:</span><strong>${cur} ${r2.toFixed(2)}</strong></div>
        `;
    } else {
        let overheadCosts = v1;
        let directLabor = v2;
        let overheadRate = directLabor > 0 ? (overheadCosts / directLabor) * 100 : 0;
        resArea.innerHTML = `
            <div class="result-item"><span>Overhead Rate:</span><strong>${overheadRate.toFixed(2)}%</strong></div>
            <div class="result-item"><span>Cost Ratio:</span><strong>${cur} ${overheadCosts.toFixed(2)} / ${cur} ${directLabor.toFixed(2)}</strong></div>
        `;
    }
}

window.onload = function() {
    renderInputs();
    runActiveCalculator();
};

function clearCalculator() {
    const inputs = document.querySelectorAll('#inputs-area input');
    inputs.forEach(input => {
        input.value = '';
    });
    runActiveCalculator();
}


function downloadCalculationPDF() {
    window.print();
}



document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const statusDiv = document.getElementById('form-status');
    const sendBtn = document.getElementById('send-btn');
    
    sendBtn.innerText = 'Sending...';
    sendBtn.disabled = true;

    // Correct Template ID ending with 'l'
    emailjs.sendForm('service_qiq13fe', 'template_vmzfo9b', this)
        .then(function() {
            statusDiv.style.color = '#4caf50';
            statusDiv.innerText = 'Message sent successfully!';
            document.getElementById('contact-form').reset();
            sendBtn.innerText = 'Send';
            sendBtn.disabled = false;
        }, function(error) {
            statusDiv.style.color = '#f44336';
            statusDiv.innerText = 'Failed to send message: ' + JSON.stringify(error);
            sendBtn.innerText = 'Send';
            sendBtn.disabled = false;
        });
});


