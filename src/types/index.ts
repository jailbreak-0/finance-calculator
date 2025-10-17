// Currency Types
export type Currency = 'GHS' | 'USD' | 'EUR' | 'GBP' | 'NGN' | 'KES' | 'ZAR' | 'CAD' | 'JPY' | 'INR'| 'AUD' | 'CHF' | 'CNY' | 'HKD' | 'NZD' | 'SGD' | 'SK';

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  GHS: '₵',
  USD: '$',
  CAD: '$',
  JPY: '¥',
  INR: '₹',
  AUD: 'A$',
  CHF: 'CHF',
  CNY: '¥',
  HKD: 'HK$',
  NZD: 'NZ$',
  SGD: 'S$',
  SK: 'Sk',
  EUR: '€',
  GBP: '£',
  NGN: '₦',
  KES: 'KSh',
  ZAR: 'R',
};

// Input Types
export type ContributionFrequency = 'Daily' | 'Weekly' | 'Monthly' | 'Quarterly' | 'Yearly';
export type CompoundingFrequency = 'Monthly' | 'Quarterly' | 'Semi-Annually' | 'Annually';
export type InterestPayout = 'Cumulative' | 'Monthly' | 'Quarterly' | 'Annually';
export type LoanPeriodUnit = 'Years' | 'Months';

// Calculator IDs
export type CalculatorId = 
  | 'compoundInterest' 
  | 'fixedDeposit' 
  | 'treasuryBills' 
  | 'loans' 
  | 'retirementPlanner';

// Compound Interest Types
export interface CompoundInterestInputs {
  initialInvestment: number;
  contributionAmount: number;
  contributionFrequency: ContributionFrequency;
  annualInterestRate: number;
  investmentPeriodYears: number;
  compoundingFrequency: CompoundingFrequency;
  annualDepositIncrement?: number;
}

export interface CompoundInterestBreakdown {
  year: number;
  startingBalance: number;
  contribution: number;
  interestEarned: number;
  endingBalance: number;
}

export interface CompoundInterestOutputs {
  finalAmount: number;
  totalContributions: number;
  totalInterest: number;
  annualBreakdown: CompoundInterestBreakdown[];
}

// Fixed Deposit Types
export interface FixedDepositInputs {
  depositAmount: number;
  annualInterestRate: number;
  tenure: number;
  interestPayout: InterestPayout;
}

export interface FixedDepositBreakdown {
  period: string;
  interestPaid: number;
  balance: number;
  payoutDate: Date;
}

export interface FixedDepositOutputs {
  maturityValue: number;
  totalInterest: number;
  periodicPayoutAmount?: number;
  breakdown: FixedDepositBreakdown[];
}

// Treasury Bills Types
export interface TreasuryBillsInputs {
  investmentAmount: number;
  maturityPeriodDays: 91 | 182 | 364;
  annualInterestRate: number;
}

export interface TreasuryBillsBreakdown {
  step: string;
  value: string;
  explanation: string;
}

export interface TreasuryBillsOutputs {
  discountedPrice: number;
  profit: number;
  effectiveYield: number;
  breakdown: TreasuryBillsBreakdown[];
}

// Loan Types
export interface LoanInputs {
  loanAmount: number;
  annualInterestRate: number;
  loanPeriod: number;
  loanPeriodUnit: LoanPeriodUnit;
  annualIncome?: number;
  startDate?: Date;
}

export interface LoanBreakdown {
  period: number;
  emi: number;
  interest: number;
  principal: number;
  remainingBalance: number;
}

export interface LoanOutputs {
  monthlyEMI: number;
  totalInterest: number;
  totalRepayment: number;
  amortizationSchedule: LoanBreakdown[];
  debtToIncomeRatio?: number;
}

// Retirement Planner Types
export interface RetirementPlannerInputs {
  currentAge: number;
  retirementAge: number;
  currentBalance: number;
  monthlyContribution: number;
  currentAnnualIncome?: number;
  expectedReturn: number;
  inflationRate: number;
}

export interface RetirementPlannerBreakdown {
  year: number;
  age: number;
  startBalance: number;
  contribution: number;
  interest: number;
  endBalance: number;
  inflationAdjustedValue: number;
}

export interface RetirementPlannerOutputs {
  projectedCorpusNominal: number;
  projectedCorpusReal: number;
  yearlyProjection: RetirementPlannerBreakdown[];
}

// Generic Calculator Types
export type CalculatorInputs = 
  | CompoundInterestInputs 
  | FixedDepositInputs 
  | TreasuryBillsInputs 
  | LoanInputs 
  | RetirementPlannerInputs;

export type CalculatorOutputs = 
  | CompoundInterestOutputs 
  | FixedDepositOutputs 
  | TreasuryBillsOutputs 
  | LoanOutputs 
  | RetirementPlannerOutputs;

// Database Types
export interface User {
  id: string;
  locale: string;
  defaultCurrency: Currency;
  notificationPrefs: NotificationPreferences;
  createdAt: Date;
}

export interface Calculation {
  id: string;
  userId: string;
  calculatorId: CalculatorId;
  inputs: CalculatorInputs;
  results: CalculatorOutputs;
  createdAt: Date;
  title?: string;
}

export interface Scenario {
  id: string;
  userId: string;
  name: string;
  calculatorId: CalculatorId;
  inputs: CalculatorInputs;
  results: CalculatorOutputs;
  createdAt: Date;
}

// Notification Types
export interface NotificationPreferences {
  enableQuotes: boolean;
  enablePrompts: boolean;
  frequency: 'daily' | 'weekly' | 'never';
  preferredTime: string;
  doNotDisturb: boolean;
}

export interface NotificationTemplate {
  id: string;
  title: string;
  body: string;
}

// AI Assistant Types
export interface AIPromptType {
  summary: string;
  whatIf: string;
  explainFormula: string;
}

export interface AIResponse {
  message: string;
  suggestions?: string[];
}

// API Types
export interface CalculateRequest {
  calculatorId: CalculatorId;
  inputs: CalculatorInputs;
}

export interface CalculateResponse {
  success: boolean;
  results: CalculatorOutputs;
  error?: string;
}

export interface AIAssistRequest {
  calculatorId: CalculatorId;
  results: CalculatorOutputs;
  promptType: keyof AIPromptType;
  context?: any;
}

// Theme Types
export interface Theme {
    primaryColor: string;
    accent: string;
    darkMode: boolean;
    backgroundColor: string;
    cardBackground: string;
    textPrimary: string;
    textSecondary: string;
    textTertiary: string;
    border: string;
}

// Calculator Metadata
export interface CalculatorMetadata {
  id: CalculatorId;
  title: string;
  description: string;
  icon: string;
}
