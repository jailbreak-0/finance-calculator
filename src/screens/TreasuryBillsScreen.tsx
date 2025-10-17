import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { CurrencyInput } from '../components/CurrencyInput';
import { NumberInput } from '../components/NumberInput';
import { DropdownPicker } from '../components/DropdownPicker';
import { BreakdownModal } from '../components/BreakdownModal';
import { calculateTreasuryBills } from '../services/treasuryBillsCalculator';
import { useCurrency } from '../context/CurrencyContext';
import { DARK_THEME } from '../constants/theme';
import { TREASURY_MATURITY_PERIODS } from '../constants/calculators';
import { TreasuryBillsOutputs, CURRENCY_SYMBOLS } from '../types';

export const TreasuryBillsScreen: React.FC = () => {
  const { currency } = useCurrency();
  const [investmentAmount, setInvestmentAmount] = useState('10000');
  const [maturityPeriodDays, setMaturityPeriodDays] = useState<91 | 182 | 364>(91);
  const [annualInterestRate, setAnnualInterestRate] = useState('5.5');
  const [results, setResults] = useState<TreasuryBillsOutputs | null>(null);
  const [showBreakdown, setShowBreakdown] = useState(false);

  const formatCurrency = (amount: number) => {
    return `${CURRENCY_SYMBOLS[currency]}${amount.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const handleCalculate = () => {
    const inputs = {
      investmentAmount: parseFloat(investmentAmount) || 0,
      maturityPeriodDays: maturityPeriodDays,
      annualInterestRate: parseFloat(annualInterestRate) || 0,
    };

    const output = calculateTreasuryBills(inputs);
    setResults(output);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={DARK_THEME.backgroundColor} />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>📊 Treasury Bills</Text>
          <Text style={styles.subtitle}>
            Calculate discount price and effective yield
          </Text>
        </View>

        <View style={styles.form}>
          <CurrencyInput
            label="Face Value (Investment Amount)"
            value={investmentAmount}
            onChangeText={setInvestmentAmount}
            currency={currency}
          />

          <DropdownPicker
            label="Maturity Period"
            value={maturityPeriodDays}
            onValueChange={setMaturityPeriodDays}
            items={TREASURY_MATURITY_PERIODS}
          />

          <NumberInput
            label="Annual Discount Rate"
            value={annualInterestRate}
            onChangeText={setAnnualInterestRate}
            suffix="%"
          />

          <TouchableOpacity style={styles.calculateButton} onPress={handleCalculate}>
            <Text style={styles.calculateButtonText}>Calculate</Text>
          </TouchableOpacity>
        </View>

        {results && (
          <View style={styles.results}>
            <Text style={styles.resultsTitle}>Results</Text>
            
            <View style={styles.resultCard}>
              <Text style={styles.resultLabel}>Purchase Price (Discounted)</Text>
              <Text style={styles.resultValue}>{formatCurrency(results.discountedPrice)}</Text>
              <Text style={styles.resultHint}>Amount you pay upfront</Text>
            </View>

            <View style={styles.resultCard}>
              <Text style={styles.resultLabel}>Profit at Maturity</Text>
              <Text style={[styles.resultValue, { color: DARK_THEME.accent }]}>
                {formatCurrency(results.profit)}
              </Text>
              <Text style={styles.resultHint}>
                Received at maturity ({maturityPeriodDays} days)
              </Text>
            </View>

            <View style={styles.resultCard}>
              <Text style={styles.resultLabel}>Effective Annual Yield</Text>
              <Text style={[styles.resultValue, { color: '#51CF66' }]}>
                {results.effectiveYield.toFixed(2)}%
              </Text>
              <Text style={styles.resultHint}>Annualized return on investment</Text>
            </View>

            <TouchableOpacity
              style={styles.breakdownButton}
              onPress={() => setShowBreakdown(true)}
            >
              <Text style={styles.breakdownButtonText}>View Calculation Steps</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      <BreakdownModal
        visible={showBreakdown}
        onClose={() => setShowBreakdown(false)}
        title="Calculation Breakdown"
      >
        {results?.breakdown.map((step, index) => (
          <View key={index} style={styles.breakdownRow}>
            <View style={styles.stepHeader}>
              <Text style={styles.stepNumber}>{index + 1}</Text>
              <Text style={styles.stepTitle}>{step.step}</Text>
            </View>
            <Text style={styles.stepValue}>{step.value}</Text>
            <Text style={styles.stepExplanation}>{step.explanation}</Text>
          </View>
        ))}
      </BreakdownModal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DARK_THEME.backgroundColor,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: DARK_THEME.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: DARK_THEME.textSecondary,
  },
  form: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  calculateButton: {
    backgroundColor: DARK_THEME.primaryColor,
    borderRadius: 8,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  calculateButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  results: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  resultsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: DARK_THEME.textPrimary,
    marginBottom: 16,
  },
  resultCard: {
    backgroundColor: DARK_THEME.cardBackground,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: DARK_THEME.border,
  },
  resultLabel: {
    fontSize: 14,
    color: DARK_THEME.textSecondary,
    marginBottom: 6,
  },
  resultValue: {
    fontSize: 24,
    fontWeight: '700',
    color: DARK_THEME.textPrimary,
  },
  resultHint: {
    fontSize: 12,
    color: DARK_THEME.textSecondary,
    marginTop: 8,
  },
  breakdownButton: {
    backgroundColor: DARK_THEME.cardBackground,
    borderRadius: 8,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    borderWidth: 1,
    borderColor: DARK_THEME.primaryColor,
  },
  breakdownButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: DARK_THEME.primaryColor,
  },
  breakdownRow: {
    backgroundColor: DARK_THEME.cardBackground,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: DARK_THEME.border,
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: DARK_THEME.primaryColor,
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 28,
    marginRight: 12,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: DARK_THEME.textPrimary,
    flex: 1,
  },
  stepValue: {
    fontSize: 20,
    fontWeight: '700',
    color: DARK_THEME.accent,
    marginVertical: 8,
  },
  stepExplanation: {
    fontSize: 13,
    color: DARK_THEME.textSecondary,
    lineHeight: 18,
  },
});
