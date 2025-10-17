import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CalculatorMetadata } from '../types';
import { DARK_THEME } from '../constants/theme';

interface CalculatorCardProps {
  calculator: CalculatorMetadata;
  onPress: () => void;
}

export const CalculatorCard: React.FC<CalculatorCardProps> = ({ calculator, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>{calculator.icon}</Text>
      </View>
      <Text style={styles.title}>{calculator.title}</Text>
      <Text style={styles.description} numberOfLines={4}>
        {calculator.description}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: DARK_THEME.cardBackground,
    borderRadius: 12,
    padding: 16,
    margin: 8,
    minHeight: 140,
    borderWidth: 1,
    borderColor: DARK_THEME.border,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: DARK_THEME.primaryColor + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  icon: {
    fontSize: 24,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: DARK_THEME.textPrimary,
    marginBottom: 6,
  },
  description: {
    fontSize: 12,
    color: DARK_THEME.accent,
    lineHeight: 16,
  },
});
