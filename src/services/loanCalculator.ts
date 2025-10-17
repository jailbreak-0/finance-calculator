import { LoanInputs, LoanOutputs, LoanBreakdown, LoanPeriodUnit } from '../types';

/**
 * Convert loan period to months
 */
function getLoanPeriodInMonths(period: number, unit: LoanPeriodUnit): number {
  return unit === 'Years' ? period * 12 : period;
}

/**
 * Calculate loan EMI and amortization schedule
 * EMI = (P * r * (1 + r)^n) / ((1 + r)^n - 1)
 */
export function calculateLoan(inputs: LoanInputs): LoanOutputs {
  const { loanAmount, annualInterestRate, loanPeriod, loanPeriodUnit, annualIncome, startDate } = inputs;

  const P = loanAmount;
  const r = annualInterestRate / 12 / 100; // Monthly interest rate
  const n = getLoanPeriodInMonths(loanPeriod, loanPeriodUnit);

  // Calculate EMI
  let monthlyEMI: number;
  if (r === 0) {
    // No interest
    monthlyEMI = P / n;
  } else {
    monthlyEMI = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  }

  // Generate amortization schedule
  const amortizationSchedule: LoanBreakdown[] = [];
  let remainingBalance = P;

  for (let period = 1; period <= n; period++) {
    const interest = remainingBalance * r;
    const principal = monthlyEMI - interest;
    remainingBalance -= principal;

    // Prevent negative balance due to floating point errors
    if (remainingBalance < 0.01) remainingBalance = 0;

    amortizationSchedule.push({
      period,
      emi: monthlyEMI,
      interest,
      principal,
      remainingBalance,
    });
  }

  const totalRepayment = monthlyEMI * n;
  const totalInterest = totalRepayment - P;

  // Calculate debt-to-income ratio if annual income provided
  let debtToIncomeRatio: number | undefined;
  if (annualIncome) {
    const annualEMI = monthlyEMI * 12;
    debtToIncomeRatio = (annualEMI / annualIncome) * 100;
  }

  return {
    monthlyEMI,
    totalInterest,
    totalRepayment,
    amortizationSchedule,
    debtToIncomeRatio,
  };
}
