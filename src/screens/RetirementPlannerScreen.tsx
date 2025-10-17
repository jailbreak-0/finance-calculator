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
import { calculateRetirementPlanner } from '../services/retirementPlannerCalculator';
import { useCurrency } from '../context/CurrencyContext';
import { DARK_THEME } from '../constants/theme';
import { RetirementPlannerOutputs, CURRENCY_SYMBOLS } from '../types';

export const RetirementPlannerScreen: React.FC = () => {
  const { currency } = useCurrency();
  const [currentAge, setCurrentAge] = useState('30');
  const [retirementAge, setRetirementAge] = useState('65');
  const [currentBalance, setCurrentBalance] = useState('50000');
  const [monthlyContribution, setMonthlyContribution] = useState('500');
  const [expectedReturn, setExpectedReturn] = useState('8');
  const [inflationRate, setInflationRate] = useState('3');
  const [results, setResults] = useState<RetirementPlannerOutputs | null>(null);
  const [showBreakdown, setShowBreakdown] = useState(false);

  const formatCurrency = (amount: number) => {
    return `${CURRENCY_SYMBOLS[currency]}${amount.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}`;
  };

  const handleCalculate = () => {
    const inputs = {
      currentAge: parseFloat(currentAge) || 0,
      retirementAge: parseFloat(retirementAge) || 0,
      currentBalance: parseFloat(currentBalance) || 0,
      monthlyContribution: parseFloat(monthlyContribution) || 0,
      expectedReturn: parseFloat(expectedReturn) || 0,
      inflationRate: parseFloat(inflationRate) || 0,
    };

    const output = calculateRetirementPlanner(inputs);
    setResults(output);
  };

  const yearsToRetirement = (parseFloat(retirementAge) || 0) - (parseFloat(currentAge) || 0);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={DARK_THEME.backgroundColor} />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>🏖️ Retirement Planner</Text>
          <Text style={styles.subtitle}>
            Plan your retirement with inflation adjustment
          </Text>
        </View>

        <View style={styles.form}>
          <NumberInput
            label="Current Age"
            value={currentAge}
            onChangeText={setCurrentAge}
            suffix="years"
            decimal={false}
          />

          <NumberInput
            label="Retirement Age"
            value={retirementAge}
            onChangeText={setRetirementAge}
            suffix="years"
            decimal={false}
          />

          {yearsToRetirement > 0 && (
            <View style={styles.infoCard}>
              <Text style={styles.infoText}>
                ⏱️ {yearsToRetirement} years until retirement
              </Text>
            </View>
          )}

          <CurrencyInput
            label="Current Retirement Balance"
            value={currentBalance}
            onChangeText={setCurrentBalance}
            currency={currency}
          />

          <CurrencyInput
            label="Monthly Contribution"
            value={monthlyContribution}
            onChangeText={setMonthlyContribution}
            currency={currency}
          />

          <NumberInput
            label="Expected Annual Return"
            value={expectedReturn}
            onChangeText={setExpectedReturn}
            suffix="%"
          />

          <NumberInput
            label="Expected Inflation Rate"
            value={inflationRate}
            onChangeText={setInflationRate}
            suffix="%"
          />

          <TouchableOpacity style={styles.calculateButton} onPress={handleCalculate}>
            <Text style={styles.calculateButtonText}>Calculate Retirement</Text>
          </TouchableOpacity>
        </View>

        {results && (
          <View style={styles.results}>
            <Text style={styles.resultsTitle}>Projected Retirement Corpus</Text>
            
            <View style={styles.resultCard}>
              <Text style={styles.resultLabel}>Nominal Value (Future Dollars)</Text>
              <Text style={styles.resultValue}>
                {formatCurrency(results.projectedCorpusNominal)}
              </Text>
              <Text style={styles.resultHint}>
                The actual dollar amount at retirement
              </Text>
            </View>

            <View style={styles.resultCard}>
              <Text style={styles.resultLabel}>Real Value (Today's Dollars)</Text>
              <Text style={[styles.resultValue, { color: DARK_THEME.accent }]}>
                {formatCurrency(results.projectedCorpusReal)}
              </Text>
              <Text style={styles.resultHint}>
                What it's worth in today's purchasing power
              </Text>
            </View>

            <View style={styles.inflationImpact}>
              <Text style={styles.impactTitle}>💡 Inflation Impact</Text>
              <Text style={styles.impactText}>
                Inflation will reduce your purchasing power by{' '}
                {formatCurrency(results.projectedCorpusNominal - results.projectedCorpusReal)}
              </Text>
              <Text style={styles.impactSubtext}>
                That's why the real value matters most for retirement planning!
              </Text>
            </View>

            <TouchableOpacity
              style={styles.breakdownButton}
              onPress={() => setShowBreakdown(true)}
            >
              <Text style={styles.breakdownButtonText}>View Year-by-Year Projection</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      <BreakdownModal
        visible={showBreakdown}
        onClose={() => setShowBreakdown(false)}
        title="Retirement Projection"
      >
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderText, { flex: 1 }]}>Age</Text>
          <Text style={[styles.tableHeaderText, { flex: 2 }]}>Balance</Text>
          <Text style={[styles.tableHeaderText, { flex: 2 }]}>Real Value</Text>
        </View>

        {results?.yearlyProjection.map((year) => (
          <View key={year.year} style={styles.tableRow}>
            <Text style={[styles.tableCell, { flex: 1 }]}>{year.age}</Text>
            <Text style={[styles.tableCell, { flex: 2 }]}>
              {formatCurrency(year.endBalance)}
            </Text>
            <Text style={[styles.tableCell, { flex: 2, color: DARK_THEME.accent }]}>
              {formatCurrency(year.inflationAdjustedValue)}
            </Text>
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
  infoCard: {
    backgroundColor: DARK_THEME.primaryColor + '20',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: DARK_THEME.primaryColor + '40',
  },
  infoText: {
    fontSize: 14,
    color: DARK_THEME.primaryColor,
    fontWeight: '600',
    textAlign: 'center',
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
  inflationImpact: {
    backgroundColor: DARK_THEME.accent + '20',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: DARK_THEME.accent + '40',
  },
  impactTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: DARK_THEME.textPrimary,
    marginBottom: 8,
  },
  impactText: {
    fontSize: 14,
    color: DARK_THEME.textPrimary,
    lineHeight: 20,
    marginBottom: 6,
  },
  impactSubtext: {
    fontSize: 12,
    color: DARK_THEME.textSecondary,
    fontStyle: 'italic',
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
});
