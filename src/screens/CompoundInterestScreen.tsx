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
import { calculateCompoundInterest } from '../services/compoundInterestCalculator';
import { useCurrency } from '../context/CurrencyContext';
import { DARK_THEME } from '../constants/theme';
import {
  CONTRIBUTION_FREQUENCIES,
  COMPOUNDING_FREQUENCIES,
} from '../constants/calculators';
import { CompoundInterestOutputs, CURRENCY_SYMBOLS } from '../types';

export const CompoundInterestScreen: React.FC = () => {
  const { currency } = useCurrency();
  const [initialInvestment, setInitialInvestment] = useState('1000');
  const [contributionAmount, setContributionAmount] = useState('50');
  const [contributionFrequency, setContributionFrequency] = useState('Monthly');
  const [annualInterestRate, setAnnualInterestRate] = useState('7.5');
  const [investmentPeriodYears, setInvestmentPeriodYears] = useState('10');
  const [compoundingFrequency, setCompoundingFrequency] = useState('Monthly');
  const [annualDepositIncrement, setAnnualDepositIncrement] = useState('0');
  const [results, setResults] = useState<CompoundInterestOutputs | null>(null);
  const [showBreakdown, setShowBreakdown] = useState(false);

  const formatCurrency = (amount: number) => {
    return `${CURRENCY_SYMBOLS[currency]}${amount.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const handleCalculate = () => {
    const inputs = {
      initialInvestment: parseFloat(initialInvestment) || 0,
      contributionAmount: parseFloat(contributionAmount) || 0,
      contributionFrequency: contributionFrequency as any,
      annualInterestRate: parseFloat(annualInterestRate) || 0,
      investmentPeriodYears: parseFloat(investmentPeriodYears) || 0,
      compoundingFrequency: compoundingFrequency as any,
      annualDepositIncrement: parseFloat(annualDepositIncrement) || 0,
    };

    const output = calculateCompoundInterest(inputs);
    setResults(output);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={DARK_THEME.backgroundColor} />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>📈 Compound Interest</Text>
          <Text style={styles.subtitle}>
            Calculate your investment growth over time
          </Text>
        </View>

        <View style={styles.form}>
          <CurrencyInput
            label="Initial Investment"
            value={initialInvestment}
            onChangeText={setInitialInvestment}
            currency={currency}
          />

          <CurrencyInput
            label="Contribution Amount"
            value={contributionAmount}
            onChangeText={setContributionAmount}
            currency={currency}
          />

          <DropdownPicker
            label="Contribution Frequency"
            value={contributionFrequency}
            onValueChange={setContributionFrequency}
            items={CONTRIBUTION_FREQUENCIES}
          />

          <NumberInput
            label="Annual Interest Rate"
            value={annualInterestRate}
            onChangeText={setAnnualInterestRate}
            suffix="%"
          />

          <NumberInput
            label="Investment Period"
            value={investmentPeriodYears}
            onChangeText={setInvestmentPeriodYears}
            suffix="years"
            decimal={false}
          />

          <DropdownPicker
            label="Compounding Frequency"
            value={compoundingFrequency}
            onValueChange={setCompoundingFrequency}
            items={COMPOUNDING_FREQUENCIES}
          />

          <NumberInput
            label="Annual Deposit Increment (Optional)"
            value={annualDepositIncrement}
            onChangeText={setAnnualDepositIncrement}
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
              <Text style={styles.resultLabel}>Final Amount</Text>
              <Text style={styles.resultValue}>{formatCurrency(results.finalAmount)}</Text>
            </View>

            <View style={styles.resultCard}>
              <Text style={styles.resultLabel}>Total Contributions</Text>
              <Text style={styles.resultValue}>
                {formatCurrency(results.totalContributions)}
              </Text>
            </View>

            <View style={styles.resultCard}>
              <Text style={styles.resultLabel}>Total Interest Earned</Text>
              <Text style={[styles.resultValue, { color: DARK_THEME.accent }]}>
                {formatCurrency(results.totalInterest)}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.breakdownButton}
              onPress={() => setShowBreakdown(true)}
            >
              <Text style={styles.breakdownButtonText}>View Breakdown</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      <BreakdownModal
        visible={showBreakdown}
        onClose={() => setShowBreakdown(false)}
        title="Year-by-Year Breakdown"
      >
        {results?.annualBreakdown.map((year) => (
          <View key={year.year} style={styles.breakdownRow}>
            <Text style={styles.breakdownYear}>Year {year.year}</Text>
            <View style={styles.breakdownDetails}>
              <View style={styles.breakdownItem}>
                <Text style={styles.breakdownLabel}>Starting Balance</Text>
                <Text style={styles.breakdownValue}>
                  {formatCurrency(year.startingBalance)}
                </Text>
              </View>
              <View style={styles.breakdownItem}>
                <Text style={styles.breakdownLabel}>Contributions</Text>
                <Text style={styles.breakdownValue}>
                  {formatCurrency(year.contribution)}
                </Text>
              </View>
              <View style={styles.breakdownItem}>
                <Text style={styles.breakdownLabel}>Interest Earned</Text>
                <Text style={[styles.breakdownValue, { color: DARK_THEME.accent }]}>
                  {formatCurrency(year.interestEarned)}
                </Text>
              </View>
              <View style={styles.breakdownItem}>
                <Text style={styles.breakdownLabel}>Ending Balance</Text>
                <Text style={[styles.breakdownValue, { fontWeight: '700' }]}>
                  {formatCurrency(year.endingBalance)}
                </Text>
              </View>
            </View>
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
  breakdownYear: {
    fontSize: 16,
    fontWeight: '700',
    color: DARK_THEME.textPrimary,
    marginBottom: 12,
  },
  breakdownDetails: {
    gap: 8,
  },
  breakdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  breakdownLabel: {
    fontSize: 14,
    color: DARK_THEME.textSecondary,
  },
  breakdownValue: {
    fontSize: 14,
    fontWeight: '600',
    color: DARK_THEME.textPrimary,
  },
});
