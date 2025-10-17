import {
  TreasuryBillsInputs,
  TreasuryBillsOutputs,
  TreasuryBillsBreakdown,
} from '../types';

/**
 * Calculate Treasury Bills discount price and yield
 * DiscountedPrice = InvestmentAmount * (1 - (r * d / 365))
 * EffectiveYield = (r * 365) / d
 */
export function calculateTreasuryBills(inputs: TreasuryBillsInputs): TreasuryBillsOutputs {
  const { investmentAmount, maturityPeriodDays, annualInterestRate } = inputs;

  const r = annualInterestRate / 100; // Convert to decimal
  const d = maturityPeriodDays;

  // Calculate discounted price (what you pay upfront)
  const discountedPrice = investmentAmount / (1 + (r * d / 365));
  
  // Calculate profit (face value - discounted price)
  const profit = investmentAmount - discountedPrice;

  // Calculate effective annual yield
  const effectiveYield = ((investmentAmount - discountedPrice) / discountedPrice) * (365 / d) * 100;

  const breakdown: TreasuryBillsBreakdown[] = [
    {
      step: 'Face Value',
      value: investmentAmount.toFixed(2),
      explanation: 'The amount you will receive at maturity',
    },
    {
      step: 'Discount Rate',
      value: `${annualInterestRate}%`,
      explanation: 'Annual interest rate used for discounting',
    },
    {
      step: 'Maturity Period',
      value: `${maturityPeriodDays} days`,
      explanation: 'Time until the T-bill matures',
    },
    {
      step: 'Discounted Price',
      value: discountedPrice.toFixed(2),
      explanation: `Purchase price = ${investmentAmount} / (1 + (${r.toFixed(4)} × ${d} / 365))`,
    },
    {
      step: 'Profit',
      value: profit.toFixed(2),
      explanation: `Face Value - Purchase Price = ${investmentAmount} - ${discountedPrice.toFixed(2)}`,
    },
    {
      step: 'Effective Annual Yield',
      value: `${effectiveYield.toFixed(2)}%`,
      explanation: `Annualized return = (${profit.toFixed(2)} / ${discountedPrice.toFixed(2)}) × (365 / ${d}) × 100`,
    },
  ];

  return {
    discountedPrice,
    profit,
    effectiveYield,
    breakdown,
  };
}
