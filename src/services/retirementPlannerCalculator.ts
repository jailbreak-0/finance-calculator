import {
  RetirementPlannerInputs,
  RetirementPlannerOutputs,
  RetirementPlannerBreakdown,
} from '../types';

/**
 * Calculate retirement corpus with inflation adjustment
 * FV = CB * (1 + r)^t + PMT * ((1 + r)^t - 1) / r
 * Real return = (1 + r) / (1 + inflation) - 1
 */
export function calculateRetirementPlanner(
  inputs: RetirementPlannerInputs
): RetirementPlannerOutputs {
  const {
    currentAge,
    retirementAge,
    currentBalance,
    monthlyContribution,
    expectedReturn,
    inflationRate,
  } = inputs;

  const yearsToRetirement = retirementAge - currentAge;
  const r = expectedReturn / 100; // Annual return rate
  const inflation = inflationRate / 100;
  const annualContribution = monthlyContribution * 12;

  // Calculate real return (inflation-adjusted)
  const realReturn = (1 + r) / (1 + inflation) - 1;

  const yearlyProjection: RetirementPlannerBreakdown[] = [];
  let nominalBalance = currentBalance;
  let realBalance = currentBalance;

  for (let year = 1; year <= yearsToRetirement; year++) {
    const currentAgeInYear = currentAge + year;
    const yearStart = nominalBalance;
    const contribution = annualContribution;

    // Calculate nominal growth
    const interest = nominalBalance * r;
    nominalBalance = nominalBalance + interest + contribution;

    // Calculate real (inflation-adjusted) value
    const inflationAdjustedValue = nominalBalance / Math.pow(1 + inflation, year);

    yearlyProjection.push({
      year,
      age: currentAgeInYear,
      startBalance: yearStart,
      contribution,
      interest,
      endBalance: nominalBalance,
      inflationAdjustedValue,
    });
  }

  const projectedCorpusNominal = nominalBalance;
  const projectedCorpusReal = nominalBalance / Math.pow(1 + inflation, yearsToRetirement);

  return {
    projectedCorpusNominal,
    projectedCorpusReal,
    yearlyProjection,
  };
}
