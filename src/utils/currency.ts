import { Currency, CURRENCY_SYMBOLS } from '../types';

/**
 * Format a number as currency with proper symbol and formatting
 */
export function formatCurrency(
  amount: number,
  currency: Currency,
  options?: {
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
  }
): string {
  const { minimumFractionDigits = 2, maximumFractionDigits = 2 } = options || {};
  
  const formatted = amount.toLocaleString('en-US', {
    minimumFractionDigits,
    maximumFractionDigits,
  });

  return `${CURRENCY_SYMBOLS[currency]}${formatted}`;
}

/**
 * Parse currency string to number
 */
export function parseCurrency(value: string): number {
  // Remove all non-numeric characters except decimal point
  const cleaned = value.replace(/[^0-9.]/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Validate currency input
 */
export function validateCurrencyInput(value: string): boolean {
  // Check if value matches currency pattern
  const pattern = /^\d*\.?\d{0,2}$/;
  return pattern.test(value);
}

/**
 * Format percentage with proper symbol
 */
export function formatPercentage(value: number, decimals: number = 2): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * Get recently used currencies from storage
 */
export async function getRecentCurrencies(): Promise<Currency[]> {
  // Placeholder - implement with AsyncStorage
  return ['USD', 'GHS', 'EUR'];
}

/**
 * Auto-detect currency based on locale/region
 */
export function autoDetectCurrency(): Currency {
  // This is a simplified version - in production, use device locale
  // or geolocation API
  const locale = Intl.DateTimeFormat().resolvedOptions().locale;
  
  const currencyMap: Record<string, Currency> = {
    'en-US': 'USD',
    'en-GB': 'GBP',
    'en-GH': 'GHS',
    'en-NG': 'NGN',
    'en-KE': 'KES',
    'en-ZA': 'ZAR',
    'de-DE': 'EUR',
    'fr-FR': 'EUR',
  };

  return currencyMap[locale] || 'USD';
}
