import {
  CompoundInterestInputs,
  CompoundInterestOutputs,
  CompoundInterestBreakdown,
  ContributionFrequency,
  CompoundingFrequency,
} from '../types';

/**
 * Get number of periods per year for a given frequency
 */
function getPeriodsPerYear(frequency: ContributionFrequency | CompoundingFrequency): number {
  const frequencyMap: Record<string, number> = {
    Daily: 365,
    Weekly: 52,
    Monthly: 12,
    Quarterly: 4,
    'Semi-Annually': 2,
    Yearly: 1,
    Annually: 1,
  };
  return frequencyMap[frequency] || 12;
}

/**
 * Calculate compound interest with periodic contributions
 * Formula: A = P * (1 + r/n)^(n*t) + sum_{k=1}^{N} C_k * (1 + r/n)^(n*(t - k/f))
 */
export function calculateCompoundInterest(
  inputs: CompoundInterestInputs
): CompoundInterestOutputs {
  const {
    initialInvestment,
    contributionAmount,
    contributionFrequency,
    annualInterestRate,
    investmentPeriodYears,
    compoundingFrequency,
    annualDepositIncrement = 0,
  } = inputs;

  const r = annualInterestRate / 100; // Convert to decimal
  const n = getPeriodsPerYear(compoundingFrequency); // Compounding periods per year
  const f = getPeriodsPerYear(contributionFrequency); // Contribution periods per year
  const t = investmentPeriodYears;

  // Edge case: zero interest rate
  if (r === 0) {
    const totalContributions = contributionAmount * f * t;
    return {
      finalAmount: initialInvestment + totalContributions,
      totalContributions,
      totalInterest: 0,
      annualBreakdown: [],
    };
  }

  const annualBreakdown: CompoundInterestBreakdown[] = [];
  let balance = initialInvestment;
  let totalContributions = 0;

  // Calculate year by year
  for (let year = 1; year <= t; year++) {
    const yearStart = balance;
    let yearContributions = 0;
    let yearInterest = 0;

    // Calculate contribution for this year (with increment)
    const yearMultiplier = Math.pow(1 + annualDepositIncrement / 100, year - 1);
    const adjustedContribution = contributionAmount * yearMultiplier;

    // For each contribution period in the year
    for (let period = 1; period <= f; period++) {
      // Add contribution
      balance += adjustedContribution;
      yearContributions += adjustedContribution;
      totalContributions += adjustedContribution;

      // Calculate interest for the time until end of year
      const timeRemaining = (year - (period / f));
      const periodsRemaining = timeRemaining * n;
      
      // Compound interest on this contribution
      const contributionGrowth = adjustedContribution * (Math.pow(1 + r / n, n / f) - 1);
      yearInterest += contributionGrowth;
    }

    // Compound the balance for the full year
    const yearEndBalance = yearStart * Math.pow(1 + r / n, n) + yearContributions * 
      (Math.pow(1 + r / n, n) - 1) / (Math.pow(1 + r / n, n / f) - 1);
    
    yearInterest = yearEndBalance - yearStart - yearContributions;
    balance = yearEndBalance;

    annualBreakdown.push({
      year,
      startingBalance: yearStart,
      contribution: yearContributions,
      interestEarned: yearInterest,
      endingBalance: balance,
    });
  }

  const totalInterest = balance - initialInvestment - totalContributions;

  return {
    finalAmount: balance,
    totalContributions,
    totalInterest,
    annualBreakdown,
  };
}
