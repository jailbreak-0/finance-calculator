import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Currency, CURRENCY_SYMBOLS } from '../types';
import { DARK_THEME } from '../constants/theme';

interface CurrencyInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  currency: Currency;
  error?: string;
}

export const CurrencyInput: React.FC<CurrencyInputProps> = ({
  label,
  value,
  onChangeText,
  currency,
  error,
}) => {
  const handleChange = (text: string) => {
    // Only allow numbers and decimal point
    const cleaned = text.replace(/[^0-9.]/g, '');
    // Ensure only one decimal point
    const parts = cleaned.split('.');
    if (parts.length > 2) return;
    onChangeText(cleaned);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.currencySymbol}>{CURRENCY_SYMBOLS[currency]}</Text>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={handleChange}
          keyboardType="decimal-pad"
          placeholder="0.00"
          placeholderTextColor={DARK_THEME.textSecondary}
        />
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: DARK_THEME.textPrimary,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: DARK_THEME.cardBackground,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: DARK_THEME.border,
    paddingHorizontal: 12,
  },
  currencySymbol: {
    fontSize: 16,
    fontWeight: '600',
    color: DARK_THEME.accent,
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: DARK_THEME.textPrimary,
  },
  error: {
    fontSize: 12,
    color: '#FF6B6B',
    marginTop: 4,
  },
});
