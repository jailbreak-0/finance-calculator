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
import { calculateFixedDeposit } from '../services/fixedDepositCalculator';
import { useCurrency } from '../context/CurrencyContext';
import { DARK_THEME } from '../constants/theme';
import { INTEREST_PAYOUT_OPTIONS } from '../constants/calculators';
import { FixedDepositOutputs, CURRENCY_SYMBOLS } from '../types';

export const FixedDepositScreen: React.FC = () => {
  const { currency } = useCurrency();
  const [depositAmount, setDepositAmount] = useState('10000');
  const [annualInterestRate, setAnnualInterestRate] = useState('6.5');
  const [tenure, setTenure] = useState('5');
  const [interestPayout, setInterestPayout] = useState('Cumulative');
  const [results, setResults] = useState<FixedDepositOutputs | null>(null);
  const [showBreakdown, setShowBreakdown] = useState(false);

  const formatCurrency = (amount: number) => {
    return `${CURRENCY_SYMBOLS[currency]}${amount.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const handleCalculate = () => {
    const inputs = {
      depositAmount: parseFloat(depositAmount) || 0,
      annualInterestRate: parseFloat(annualInterestRate) || 0,
      tenure: parseFloat(tenure) || 0,
      interestPayout: interestPayout as any,
    };

    const output = calculateFixedDeposit(inputs);
    setResults(output);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={DARK_THEME.backgroundColor} />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>🏦 Fixed Deposit</Text>
          <Text style={styles.subtitle}>
            Calculate maturity amount and interest
          </Text>
        </View>

        <View style={styles.form}>
          <CurrencyInput
            label="Deposit Amount"
            value={depositAmount}
            onChangeText={setDepositAmount}
            currency={currency}
          />

          <NumberInput
            label="Annual Interest Rate"
            value={annualInterestRate}
            onChangeText={setAnnualInterestRate}
            suffix="%"
          />

          <NumberInput
            label="Tenure"
            value={tenure}
            onChangeText={setTenure}
            suffix="years"
            decimal={false}
          />

          <DropdownPicker
            label="Interest Payout"
            value={interestPayout}
            onValueChange={setInterestPayout}
            items={INTEREST_PAYOUT_OPTIONS}
          />

          <TouchableOpacity style={styles.calculateButton} onPress={handleCalculate}>
            <Text style={styles.calculateButtonText}>Calculate</Text>
          </TouchableOpacity>
        </View>

        {results && (
          <View style={styles.results}>
            <Text style={styles.resultsTitle}>Results</Text>
            
            <View style={styles.resultCard}>
              <Text style={styles.resultLabel}>Maturity Value</Text>
              <Text style={styles.resultValue}>{formatCurrency(results.maturityValue)}</Text>
            </View>

            <View style={styles.resultCard}>
              <Text style={styles.resultLabel}>Total Interest Earned</Text>
              <Text style={[styles.resultValue, { color: DARK_THEME.accent }]}>
                {formatCurrency(results.totalInterest)}
              </Text>
            </View>

            {results.periodicPayoutAmount && (
              <View style={styles.resultCard}>
                <Text style={styles.resultLabel}>Periodic Payout Amount</Text>
                <Text style={styles.resultValue}>
                  {formatCurrency(results.periodicPayoutAmount)}
                </Text>
                <Text style={styles.resultHint}>
                  Per payout period ({interestPayout})
                </Text>
              </View>
            )}

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
        title="Payout Schedule"
      >
        {results?.breakdown.map((item, index) => (
          <View key={index} style={styles.breakdownRow}>
            <Text style={styles.breakdownPeriod}>{item.period}</Text>
            <View style={styles.breakdownDetails}>
              <View style={styles.breakdownItem}>
                <Text style={styles.breakdownLabel}>Interest Paid</Text>
                <Text style={[styles.breakdownValue, { color: DARK_THEME.accent }]}>
                  {formatCurrency(item.interestPaid)}
                </Text>
              </View>
              <View style={styles.breakdownItem}>
                <Text style={styles.breakdownLabel}>Balance</Text>
                <Text style={styles.breakdownValue}>
                  {formatCurrency(item.balance)}
                </Text>
              </View>
              <View style={styles.breakdownItem}>
                <Text style={styles.breakdownLabel}>Payout Date</Text>
                <Text style={styles.breakdownValue}>
                  {item.payoutDate.toLocaleDateString()}
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
  breakdownPeriod: {
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
