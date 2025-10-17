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
import { BreakdownModal } from '../components/BreakdownModal';
import { calculateLoan } from '../services/loanCalculator';
import { useCurrency } from '../context/CurrencyContext';
import { DARK_THEME } from '../constants/theme';
import { LoanOutputs, CURRENCY_SYMBOLS } from '../types';
import { DropdownPicker } from '../components/DropdownPicker';
import { LOAN_PERIOD_UNITS } from '../constants/calculators';

export const LoansScreen: React.FC = () => {
  const { currency } = useCurrency();
  const [loanAmount, setLoanAmount] = useState('50000');
  const [annualInterestRate, setAnnualInterestRate] = useState('8.5');
  const [loanPeriod, setLoanPeriod] = useState('5');
  const [loanPeriodUnit, setLoanPeriodUnit] = useState('Years');
  const [annualIncome, setAnnualIncome] = useState('');
  const [results, setResults] = useState<LoanOutputs | null>(null);
  const [showBreakdown, setShowBreakdown] = useState(false);

  const formatCurrency = (amount: number) => {
    return `${CURRENCY_SYMBOLS[currency]}${amount.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const handleCalculate = () => {
    const inputs = {
      loanAmount: parseFloat(loanAmount) || 0,
      annualInterestRate: parseFloat(annualInterestRate) || 0,
      loanPeriod: parseFloat(loanPeriod) || 0,
      loanPeriodUnit: loanPeriodUnit as any,
      annualIncome: annualIncome ? parseFloat(annualIncome) : undefined,
    };

    const output = calculateLoan(inputs);
    setResults(output);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={DARK_THEME.backgroundColor} />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>💳 Loan Calculator</Text>
          <Text style={styles.subtitle}>
            Calculate EMI and amortization schedule
          </Text>
        </View>

        <View style={styles.form}>
          <CurrencyInput
            label="Loan Amount"
            value={loanAmount}
            onChangeText={setLoanAmount}
            currency={currency}
          />

          <NumberInput
            label="Annual Interest Rate"
            value={annualInterestRate}
            onChangeText={setAnnualInterestRate}
            suffix="%"
          />

          <NumberInput
            label="Loan Period"
            value={loanPeriod}
            onChangeText={setLoanPeriod}
            decimal={false}
          />

          <DropdownPicker
            label="Period Unit"
            value={loanPeriodUnit}
            onValueChange={setLoanPeriodUnit}
            items={LOAN_PERIOD_UNITS}
          />

          <CurrencyInput
            label="Annual Income (Optional)"
            value={annualIncome}
            onChangeText={setAnnualIncome}
            currency={currency}
          />

          <TouchableOpacity style={styles.calculateButton} onPress={handleCalculate}>
            <Text style={styles.calculateButtonText}>Calculate EMI</Text>
          </TouchableOpacity>
        </View>

        {results && (
          <View style={styles.results}>
            <Text style={styles.resultsTitle}>Results</Text>
            
            <View style={styles.resultCard}>
              <Text style={styles.resultLabel}>Monthly EMI</Text>
              <Text style={styles.resultValue}>{formatCurrency(results.monthlyEMI)}</Text>
            </View>

            <View style={styles.resultCard}>
              <Text style={styles.resultLabel}>Total Repayment</Text>
              <Text style={styles.resultValue}>
                {formatCurrency(results.totalRepayment)}
              </Text>
            </View>

            <View style={styles.resultCard}>
              <Text style={styles.resultLabel}>Total Interest</Text>
              <Text style={[styles.resultValue, { color: DARK_THEME.accent }]}>
                {formatCurrency(results.totalInterest)}
              </Text>
            </View>

            {results.debtToIncomeRatio && (
              <View style={styles.resultCard}>
                <Text style={styles.resultLabel}>Debt-to-Income Ratio</Text>
                <Text style={[
                  styles.resultValue,
                  { color: results.debtToIncomeRatio > 40 ? '#FF6B6B' : '#51CF66' }
                ]}>
                  {results.debtToIncomeRatio.toFixed(1)}%
                </Text>
                <Text style={styles.resultHint}>
                  {results.debtToIncomeRatio > 40 
                    ? '⚠️ High debt burden - consider reducing loan or increasing income'
                    : '✓ Healthy debt-to-income ratio'}
                </Text>
              </View>
            )}

            <TouchableOpacity
              style={styles.breakdownButton}
              onPress={() => setShowBreakdown(true)}
            >
              <Text style={styles.breakdownButtonText}>View Amortization Schedule</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      <BreakdownModal
        visible={showBreakdown}
        onClose={() => setShowBreakdown(false)}
        title="Amortization Schedule"
      >
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderText, { flex: 1 }]}>Month</Text>
          <Text style={[styles.tableHeaderText, { flex: 2 }]}>Principal</Text>
          <Text style={[styles.tableHeaderText, { flex: 2 }]}>Interest</Text>
          <Text style={[styles.tableHeaderText, { flex: 2 }]}>Balance</Text>
        </View>
        
        {results?.amortizationSchedule.slice(0, 12).map((month) => (
          <View key={month.period} style={styles.tableRow}>
            <Text style={[styles.tableCell, { flex: 1 }]}>{month.period}</Text>
            <Text style={[styles.tableCell, { flex: 2 }]}>
              {formatCurrency(month.principal)}
            </Text>
            <Text style={[styles.tableCell, { flex: 2, color: DARK_THEME.accent }]}>
              {formatCurrency(month.interest)}
            </Text>
            <Text style={[styles.tableCell, { flex: 2 }]}>
              {formatCurrency(month.remainingBalance)}
            </Text>
          </View>
        ))}
        
        {results && results.amortizationSchedule.length > 12 && (
          <Text style={styles.moreInfo}>
            Showing first 12 months of {results.amortizationSchedule.length} total payments
          </Text>
        )}
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
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: DARK_THEME.cardBackground,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: DARK_THEME.border,
  },
  tableHeaderText: {
    fontSize: 12,
    fontWeight: '700',
    color: DARK_THEME.textPrimary,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    backgroundColor: DARK_THEME.cardBackground,
    borderRadius: 6,
    padding: 10,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: DARK_THEME.border,
  },
  tableCell: {
    fontSize: 12,
    color: DARK_THEME.textPrimary,
    textAlign: 'center',
  },
  moreInfo: {
    fontSize: 12,
    color: DARK_THEME.textSecondary,
    textAlign: 'center',
    marginTop: 16,
    fontStyle: 'italic',
  },
});
