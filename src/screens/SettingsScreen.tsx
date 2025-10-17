import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useCurrency } from '../context/CurrencyContext';
import { DARK_THEME } from '../constants/theme';
import { Currency, CURRENCY_SYMBOLS } from '../types';

const SUPPORTED_CURRENCIES: { code: Currency; name: string; flag: string }[] = [
    { code: 'USD', name: 'US Dollar', flag: '🇺🇸' },
    { code: 'GHS', name: 'Ghanaian Cedi', flag: '🇬🇭' },
    { code: 'CAD', name: 'Canadian Dollar', flag: '🇨🇦' },
    { code: 'AUD', name: 'Australian Dollar', flag: '🇦🇺' },
    { code: 'JPY', name: 'Japanese Yen', flag: '🇯🇵' },
    { code: 'EUR', name: 'Euro', flag: '🇪🇺' },
    { code: 'GBP', name: 'British Pound', flag: '🇬🇧' },
    { code: 'INR', name: 'Indian Rupee', flag: '🇮🇳' },
    { code: 'CNY', name: 'Chinese Yuan', flag: '🇨🇳' },
    { code: 'SGD', name: 'Singapore Dollar', flag: '🇸🇬' },
    { code: 'HKD', name: 'Hong Kong Dollar', flag: '🇭🇰' },
    { code: 'SK', name: 'Slovak Koruna', flag: '🇸🇰' },
    { code: 'NZD', name: 'New Zealand Dollar', flag: '🇳🇿' },
    { code: 'NGN', name: 'Nigerian Naira', flag: '🇳🇬' },
    { code: 'KES', name: 'Kenyan Shilling', flag: '🇰🇪' },
    { code: 'ZAR', name: 'South African Rand', flag: '🇿🇦' },
];

export const SettingsScreen: React.FC = () => {
  const { currency: activeCurrency, setCurrency } = useCurrency();

  const handleCurrencySelect = (currency: Currency) => {
    setCurrency(currency);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={DARK_THEME.backgroundColor} />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>⚙️ Settings</Text>
          <Text style={styles.subtitle}>Customize your experience</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Currency</Text>
          <Text style={styles.sectionDescription}>
            Select your preferred currency for all calculations
          </Text>

          <View style={styles.currencyList}>
            {SUPPORTED_CURRENCIES.map((curr) => (
              <TouchableOpacity
                key={curr.code}
                style={[
                  styles.currencyItem,
                  activeCurrency === curr.code && styles.currencyItemActive,
                ]}
                onPress={() => handleCurrencySelect(curr.code)}
                activeOpacity={0.7}
              >
                <View style={styles.currencyInfo}>
                  <Text style={styles.currencyFlag}>{curr.flag}</Text>
                  <View style={styles.currencyText}>
                    <Text style={styles.currencyName}>{curr.name}</Text>
                    <Text style={styles.currencyCode}>
                      {curr.code} ({CURRENCY_SYMBOLS[curr.code]})
                    </Text>
                  </View>
                </View>
                {activeCurrency === curr.code && (
                  <View style={styles.checkmark}>
                    <Text style={styles.checkmarkText}>✓</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>App</Text>
            <Text style={styles.infoValue}>Finance Calculator</Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>App Version</Text>
            <Text style={styles.infoValue}>1.1.0</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Made with ❤️ for better financial planning
          </Text>
          <Text style={styles.footerSubtext}>
            © 2025 Finance Calculator
          </Text>
        </View>
      </ScrollView>
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
    fontSize: 32,
    fontWeight: '700',
    color: DARK_THEME.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: DARK_THEME.textSecondary,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: DARK_THEME.textPrimary,
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: DARK_THEME.textSecondary,
    marginBottom: 16,
  },
  currencyList: {
    gap: 12,
  },
  currencyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: DARK_THEME.cardBackground,
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: DARK_THEME.border,
  },
  currencyItemActive: {
    borderColor: DARK_THEME.accent,
    backgroundColor: DARK_THEME.accent + '15',
  },
  currencyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  currencyFlag: {
    fontSize: 32,
    marginRight: 16,
  },
  currencyText: {
    flex: 1,
  },
  currencyName: {
    fontSize: 16,
    fontWeight: '600',
    color: DARK_THEME.textPrimary,
    marginBottom: 4,
  },
  currencyCode: {
    fontSize: 14,
    color: DARK_THEME.textSecondary,
  },
  checkmark: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: DARK_THEME.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  infoCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: DARK_THEME.cardBackground,
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: DARK_THEME.border,
  },
  infoLabel: {
    fontSize: 14,
    color: DARK_THEME.textSecondary,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: DARK_THEME.accent,
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 32,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: DARK_THEME.textSecondary,
    marginBottom: 8,
  },
  footerSubtext: {
    fontSize: 12,
    color: DARK_THEME.accent,
    opacity: 0.6,
  },
});
