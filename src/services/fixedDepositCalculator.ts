import {
  FixedDepositInputs,
  FixedDepositOutputs,
  FixedDepositBreakdown,
  InterestPayout,
} from '../types';

/**
 * Get number of payouts per year
 */
function getPayoutsPerYear(payout: InterestPayout): number {
  const payoutMap: Record<InterestPayout, number> = {
    Cumulative: 0,
    Monthly: 12,
    Quarterly: 4,
    Annually: 1,
  };
  return payoutMap[payout];
}

/**
 * Calculate fixed deposit maturity and payouts
 * Cumulative: M = P * (1 + r/m)^(m*t)
 * Periodic: Interest = P * r / p (maturity value = P)
 */
export function calculateFixedDeposit(inputs: FixedDepositInputs): FixedDepositOutputs {
  const { depositAmount, annualInterestRate, tenure, interestPayout } = inputs;

  const r = annualInterestRate / 100; // Convert to decimal
  const t = tenure;
  const p = getPayoutsPerYear(interestPayout);

  const breakdown: FixedDepositBreakdown[] = [];
  let maturityValue: number;
  let totalInterest: number;
  let periodicPayoutAmount: number | undefined;

  if (interestPayout === 'Cumulative') {
    // Compound interest, typically compounded quarterly for FDs
    const m = 4; // Quarterly compounding
    maturityValue = depositAmount * Math.pow(1 + r / m, m * t);
    totalInterest = maturityValue - depositAmount;

    // Generate breakdown for each quarter
    let balance = depositAmount;
    const totalPeriods = m * t;
    
    for (let period = 1; period <= totalPeriods; period++) {
      const interest = balance * (r / m);
      balance += interest;
      
      const quarterNum = period % m === 0 ? m : period % m;
      const year = Math.ceil(period / m);
      
      breakdown.push({
        period: `Q${quarterNum} Y${year}`,
        interestPaid: interest,
        balance,
        payoutDate: new Date(new Date().setMonth(new Date().getMonth() + (period * 3))),
      });
    }
  } else {
    // Periodic payout - simple interest on principal
    periodicPayoutAmount = (depositAmount * r) / p;
    maturityValue = depositAmount; // Principal returned at maturity
    totalInterest = periodicPayoutAmount * p * t;

    // Generate breakdown for each payout period
    const totalPayouts = p * t;
    const monthsPerPayout = 12 / p;
    
    for (let period = 1; period <= totalPayouts; period++) {
      const year = Math.ceil(period / p);
      const periodInYear = period % p === 0 ? p : period % p;
      
      breakdown.push({
        period: `Period ${periodInYear} Y${year}`,
        interestPaid: periodicPayoutAmount,
        balance: depositAmount,
        payoutDate: new Date(new Date().setMonth(new Date().getMonth() + (period * monthsPerPayout))),
      });
    }
  }

  return {
    maturityValue,
    totalInterest,
    periodicPayoutAmount,
    breakdown,
  };
}
