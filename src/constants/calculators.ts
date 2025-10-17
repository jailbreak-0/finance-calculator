import { CalculatorMetadata } from '../types';

export const CALCULATORS: CalculatorMetadata[] = [
  {
    id: 'compoundInterest',
    title: 'Compound Interest',
    description: 'Projects investment growth with periodic contributions and compounding.',
    icon: '📈',
  },
  {
    id: 'fixedDeposit',
    title: 'Fixed Deposit',
    description: 'Calculates maturity amounts for deposit with different payout options.',
    icon: '🏦',
  },
  {
    id: 'treasuryBills',
    title: 'Treasury Bills',
    description: 'Calculates discounted purchase price and effective yield for T-bills.',
    icon: '📊',
  },
  {
    id: 'loans',
    title: 'Loans',
    description: 'EMI, amortization schedule and affordability insights.',
    icon: '💳',
  },
  {
    id: 'retirementPlanner',
    title: 'Retirement Planner',
    description: 'Estimate retirement corpus and real value after inflation.',
    icon: '🏖️',
  },
];

export const CONTRIBUTION_FREQUENCIES = ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly'];
export const COMPOUNDING_FREQUENCIES = ['Monthly', 'Quarterly', 'Semi-Annually', 'Annually'];
export const INTEREST_PAYOUT_OPTIONS = ['Cumulative', 'Monthly', 'Quarterly', 'Annually'];
export const LOAN_PERIOD_UNITS = ['Years', 'Months'];
export const TREASURY_MATURITY_PERIODS = [91, 182, 364];
