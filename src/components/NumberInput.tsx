import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { DARK_THEME } from '../constants/theme';

interface NumberInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  suffix?: string;
  error?: string;
  decimal?: boolean;
}

export const NumberInput: React.FC<NumberInputProps> = ({
  label,
  value,
  onChangeText,
  suffix,
  error,
  decimal = true,
}) => {
  const handleChange = (text: string) => {
    if (decimal) {
      // Allow numbers and decimal point
      const cleaned = text.replace(/[^0-9.]/g, '');
      const parts = cleaned.split('.');
      if (parts.length > 2) return;
      onChangeText(cleaned);
    } else {
      // Only allow integers
      const cleaned = text.replace(/[^0-9]/g, '');
      onChangeText(cleaned);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={handleChange}
          keyboardType={decimal ? 'decimal-pad' : 'number-pad'}
          placeholder="0"
          placeholderTextColor={DARK_THEME.textSecondary}
        />
        {suffix && <Text style={styles.suffix}>{suffix}</Text>}
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
  input: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: DARK_THEME.textPrimary,
  },
  suffix: {
    fontSize: 16,
    fontWeight: '600',
    color: DARK_THEME.accent,
    marginLeft: 8,
  },
  error: {
    fontSize: 12,
    color: '#FF6B6B',
    marginTop: 4,
  },
});
